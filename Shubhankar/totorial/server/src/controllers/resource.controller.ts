import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import {Resource} from '../models'
import {getResources, createResource, IResourcePayload, getResource} from '../repositories/resource.repository'

@Route("resources")
@Tags("resource")
export default class ResourceController {
  @Get("/")
  public async getResources(): Promise<Array<Resource>> {
    return getResources()
  }

  @Post("/")
  public async createResource(@Body() body: IResourcePayload): Promise<Resource> {
    return createResource(body)
  }

  @Get("/:id")
  public async getResource(@Path() id: string): Promise<Resource | null> {
    return getResource(Number(id))
  }
}
