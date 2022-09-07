import { Get, Route, Tags, Post, Body, Path } from 'tsoa';

import { Inject } from 'typescript-ioc';
import { Resources } from './model/resource';
import { IResourcePayload, ResourceRepository } from './resource.repository';

@Route('resource')
@Tags('resources')
export class ResourceController {
  @Inject
  private ResourceRepository!: ResourceRepository;
  service: any;
  @Get('/')
  public getResources(): Promise<Array<Resources>> {
    return this.ResourceRepository.getResources();
  }

  @Post('/')
  public createResource(@Body() body: IResourcePayload): Promise<Resources> {
    return this.ResourceRepository.createResource(body);
  }

  @Get('/:id')
  public getResource(@Path() id: any) {
    return this.ResourceRepository.getResource(Number(id));
  }
}
