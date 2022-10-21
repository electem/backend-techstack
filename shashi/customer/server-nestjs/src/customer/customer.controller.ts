/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomers(): Promise<Array<Customer>> {
    return this.customerService.getCustomers();
  }

  @Post()
  async createBook(@Body() customer: Customer) {
    return await this.customerService.createCustomer(customer);
  }

  @Get('/:id')
  async findCustomerById(@Param('id') id): Promise<Customer> {
    return this.customerService.findCustomerById(id);
  }

  @Put('/:id')
  async update(@Body() customer: Customer, @Param('id') id) {
    await this.customerService.findCustomerById(id);
    return await this.customerService.updateCustomer(customer, id);
  }

  @Delete('/:id')
  async deleteCustomer(@Param('id') id): Promise<string> {
    this.customerService.deleteCustomer(id);
    return 'customer deleted';
  }
}
