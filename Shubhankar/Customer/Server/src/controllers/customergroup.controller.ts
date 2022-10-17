import { createCustomerGroup, getCustomerGroup, ICustomerGroupData } from "../repositories/customergroup.repository";
import { Get, Route, Tags,Post,Body} from "tsoa";
import {CustomerGroup} from '../models/customergroup'


@Route("customergroup")
@Tags("customergroup")
export default class  CustomerGroupController {
  @Get("/")
  public async getCustomerGroup(): Promise<Array<CustomerGroup>> {
    return getCustomerGroup()
  }
  @Post("/")
  public async createCustomerGroup(@Body() body: ICustomerGroupData): Promise<CustomerGroup> {
    return createCustomerGroup(body)
  }
}