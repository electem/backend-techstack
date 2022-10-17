import { Route, Tags, Post, Body, Get, Put, Path } from "tsoa";
import { CustomerGroup } from "../models";
import {
  ICustomerGroupPayload,
  createCustomerGroup,
  getCustomerGroups,
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
}
