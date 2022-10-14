import { createCustomer, getCustomer, ICustomerData } from "../repositories/customer.repository";
import { Get, Route, Tags,Post,Body} from "tsoa";
import {Customer} from '../models/customer'

@Route("customer")
@Tags("customer")
export default class CustomerController {
  @Get("/")
  public async getCustomer(): Promise<Array<Customer>> {
    return getCustomer()
  }
  @Post("/")
  public async createCustomer(@Body() body: ICustomerData): Promise<Customer> {
    return createCustomer(body)
  }
}