import { getRepository } from 'typeorm';
import { getManager, Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Resources } from './model/resource';
export interface IResourcePayload {
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable()
export class ResourceRepository {
  constructor(private readonly connection: Connection) {}

  public createResource = async (
    payload: IResourcePayload,
  ): Promise<Resources> => {
    const resourceRepository = getRepository(Resources);
    const resource = new Resources();
    return resourceRepository.save({
      ...resource,
      ...payload,
    });
  };

  public getResource = async (id: number): Promise<Resources | null> => {
    const resourceRepository = getRepository(Resources);
    const resource = await resourceRepository.findOne({ id: id });
    if (!resource) return null;
    return resource;
  };

  public getResources = async (): Promise<Array<Resources>> => {
    const resourceRepository = getRepository(Resources);
    return resourceRepository.find();
  };
}
