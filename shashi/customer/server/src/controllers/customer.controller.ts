import { Route, Tags, Post, Body, Get } from "tsoa";
import { Customer } from "../models/customer";
import {
  ICustomerPayload,
  getCustomers,
  createCustomer,
} from "../repositories/customer.repository";

@Route("customers")
@Tags("customer")
export default class CustomerController {
  @Get("/")
  public async getCustomers(): Promise<Array<Customer>> {
    return getCustomers();
  }
  @Post("/")
  public async createCustomer(
    @Body() body: ICustomerPayload
  ): Promise<Customer> {
    return createCustomer(body);
  }
}
