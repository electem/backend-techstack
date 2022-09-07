import {getRepository} from "typeorm";
import {Resource} from '../models'

export interface IResourcePayload {
  firstName: string;
  lastName: string;
  email: string
}

export const getResources  = async () :Promise<Array<Resource>> => {
  const resourceRepository = getRepository(Resource);
  return resourceRepository.find()
}

export const createResource  = async (payload: IResourcePayload) :Promise<Resource> => {
  const resourceRepository = getRepository(Resource);
  const resource = new Resource()
  return resourceRepository.save({
    ...resource,
    ...payload
  })
}

export const getResource  = async (id: number) :Promise<Resource | null> => {
  const resourceRepository = getRepository(Resource);
  const resource = await resourceRepository.findOne({id: id})
  if (!resource) return null
  return resource
}
