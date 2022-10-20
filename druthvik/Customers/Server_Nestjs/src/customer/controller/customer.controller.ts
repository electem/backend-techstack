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
import { Unit } from '../../unit/entity/unit.entity';

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
  async findCustomerById(@Param('id') id): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  @Put('/:id')
  async update(@Body() customer: Customer, unit: Unit, @Param('id') id) {
    await this.customerService.findOne(id);
    return await this.customerService.update2(customer, id, unit);
  }

  @Delete('/:id')
  async deleteCustomer(@Param('id') id) {
    this.customerService.deleteCustomer(id);
    return 'deleted';
  }
}
