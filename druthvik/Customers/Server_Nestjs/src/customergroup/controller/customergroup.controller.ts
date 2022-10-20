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
import { CustomerGroup } from '../entity/customergroup.entity';
import { CustomerGroupService } from '../service/customergroup.service';

@Controller('customergroups')
export class CustomerGroupController {
  constructor(private customerGroupService: CustomerGroupService) {}

  @Get()
  async getCustomerGroup(): Promise<CustomerGroup[]> {
    return this.customerGroupService.getCustomerWithCustomerGroup();
  }
  @Post()
  async createCustomerGroup(@Body() customer: CustomerGroup) {
    return await this.customerGroupService.createCustomerGroup(customer);
  }

  @Get('/:id')
  async findCustomerById(@Res() response, @Param('id') id) {
    return await this.customerGroupService.getCustomerWithCustomerGroupById(id);
  }

  @Put('/:id')
  async updateCustomerGroup(@Body() customer: CustomerGroup, @Param('id') id) {
    await this.customerGroupService.findCustomerById(id);
    return await this.customerGroupService.updateCustomerGroup(customer, id);
  }

  @Delete('/:id')
  async deleteCustomerGroup(@Param('id') id) {
    this.customerGroupService.deleteCustomerGroup(id);
    return 'deleted';
  }
}
