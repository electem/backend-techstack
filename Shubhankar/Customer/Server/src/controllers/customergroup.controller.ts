import {
  createCustomerGroup,
  deleteCustomerGroup,
  getCustomerGroup,
  getCustomerGroups,
  ICustomerGroupData,
  updateCustomerGroup,
} from "../repositories/customergroup.repository";
import { Get, Route, Tags, Post, Body, Put, Path, Delete } from "tsoa";
import { CustomerGroup } from "../models/customergroup";

@Route("customergroup")
@Tags("customergroup")
export default class CustomerGroupController {
  @Get("/")
  public async getCustomerGroups(): Promise<Array<CustomerGroup>> {
    return getCustomerGroups();
  }
  @Post("/")
  public async createCustomerGroup(
    @Body() body: ICustomerGroupData
  ): Promise<CustomerGroup> {
    return createCustomerGroup(body);
  }
  @Put("/")
  public async updateCustomerGroup(
    @Body() body: ICustomerGroupData
  ): Promise<CustomerGroup> {
    return updateCustomerGroup(body);
  }

  @Get("/:id")
  public async getCustomerGroup(@Path() id: string) {
    return getCustomerGroup(Number(id));
  }
  @Delete("/:id")
  public async deleteCustomergroupById(
    @Path() id: string
  ): Promise<CustomerGroup | string> {
    return deleteCustomerGroup(Number(id));
  }
}
