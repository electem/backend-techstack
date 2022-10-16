import { Route, Tags, Post, Body, Get, Put, Path } from "tsoa";
import { Customer } from "../models/customer";
import {
  ICustomerPayload,
  getCustomers,
  createCustomer,
  getCustomerById,
  updateCustomer,
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
  @Get("/:id")
  public async getCustomerById(@Path() id: string): Promise<Customer | null> {
    return getCustomerById(Number(id));
  }

  @Put("/")
  public async updateCustomer(
    @Body() body: ICustomerPayload
  ): Promise<ICustomerPayload> {
    return updateCustomer(body);
  }
}
