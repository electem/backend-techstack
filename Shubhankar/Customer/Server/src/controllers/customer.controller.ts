import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  ICustomerData,
  updateCustomer,
} from "../repositories/customer.repository";
import { Get, Route, Tags, Post, Body, Path, Put, Delete } from "tsoa";
import { Customer } from "../models/customer";

@Route("customer")
@Tags("customer")
export default class CustomerController {
  @Get("/")
  public async getCustomers(): Promise<Array<Customer>> {
    return getCustomers();
  }
  @Post("/")
  public async createCustomer(@Body() body: ICustomerData): Promise<Customer> {
    return createCustomer(body);
  }
  @Get("/:id")
  public async getCustomer(@Path() id: string): Promise<Customer | null> {
    return getCustomer(Number(id));
  }
  @Put("/")
  public async updateCustomer(@Body() body: any): Promise<Customer> {
    return updateCustomer(body);
  }
  @Delete("/:id")
  public async deleteCustomerById(
    @Path() id: string
  ): Promise<Customer | string> {
    return deleteCustomer(Number(id));
  }
}
