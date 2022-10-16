import { Route, Tags, Post, Body, Get } from "tsoa";
import { Customer } from "../models/customer";
import {
  ICustomerPayload,
  getCustomers,
} from "../repositories/customer.repository";

@Route("customers")
@Tags("customer")
export default class CustomerController {
  @Get("/")
  public async getCustomers(): Promise<Array<Customer>> {
    return getCustomers();
  }
}
