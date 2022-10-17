import { Route, Tags, Post, Body, Get, Put, Path } from "tsoa";
import { CustomerGroup } from "../models";
import {
  ICustomerGroupPayload,
  getCustomerGroups,
} from "../repositories/customerGroup.repository";

@Route("customergroups")
@Tags("customergroup")
export default class CustomerGroupController {
  @Get("/")
  public async getCustomerGroups(): Promise<Array<CustomerGroup>> {
    return getCustomerGroups();
  }
}
