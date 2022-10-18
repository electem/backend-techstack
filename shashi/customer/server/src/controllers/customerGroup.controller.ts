import { Route, Tags, Post, Body, Get, Put, Path, Delete } from "tsoa";
import { CustomerGroup } from "../models";
import {
  ICustomerGroupPayload,
  createCustomerGroup,
  getCustomerGroups,
  getCustomerGroup,
  updateCustomerGroup,
  deleteCustomerGroupById,
} from "../repositories/customerGroup.repository";

@Route("customergroups")
@Tags("customergroup")
export default class CustomerGroupController {
  @Get("/")
  public async getCustomerGroups(): Promise<Array<CustomerGroup>> {
    return getCustomerGroups();
  }
  @Post("/")
  public async createCustomerGroup(
    @Body() body: ICustomerGroupPayload
  ): Promise<CustomerGroup> {
    return createCustomerGroup(body);
  }
  @Get("/:id")
  public async getCustomerGroup(@Path() id: string) {
    return getCustomerGroup(Number(id));
  }

  @Put("/")
  public async updateCustomerGroup(
    @Body() body: ICustomerGroupPayload
  ): Promise<ICustomerGroupPayload> {
    return updateCustomerGroup(body);
  }
  @Delete("/:id")
  public async deleteCustomerGroupById(
    @Path() id: string
  ): Promise<CustomerGroup | string | undefined> {
    return deleteCustomerGroupById(Number(id));
  }
}
