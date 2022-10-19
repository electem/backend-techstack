/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../entity/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }
  @Post()
  async createCustomer(@Body() customer: Customer) {
    return await this.customerService.createCustomer(customer);
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const customer = await this.customerService.findOne(id);
    return response.status(HttpStatus.OK).json({
      customer,
    });
  }

  @Put('/:id')
  async update(@Body() customer: Customer, @Param('id') id) {
    await this.customerService.findOne(id);
    return await this.customerService.updateCustomer(customer, id);
  }

  @Delete('/:id')
  async deleteCustomer(@Param('id') id) {
    this.customerService.deleteCustomer(id);
    return 'deleted';
  }
}
