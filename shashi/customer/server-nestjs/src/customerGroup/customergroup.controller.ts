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
import { CustomerGroup } from './customergroup.entity';
import { CustomerGroupService } from './customergroup.service';

@Controller('customergroup')
export class CustomerGroupController {
  constructor(private readonly customergroupService: CustomerGroupService) {}

  @Get()
  async getCustomerGroups(): Promise<Array<CustomerGroup>> {
    return this.customergroupService.getCustomerGroups();
  }

  @Post()
  async createCustomergroup(@Body() customergroup: CustomerGroup) {
    return await this.customergroupService.createCustomergroup(customergroup);
  }

  @Get('/:id')
  async findCustomerGroupById(@Param('id') id): Promise<CustomerGroup> {
    return this.customergroupService.findCustomerGroupById(id);
  }

  @Put('/:id')
  async updateCustomerGroup(
    @Body() customergroup: CustomerGroup,
    @Param('id') id,
  ) {
    await this.customergroupService.findCustomerGroupById(id);
    return await this.customergroupService.updateCustomerGroup(
      customergroup,
      id,
    );
  }

  @Delete('/:id')
  async deleteCustomerGroup(@Param('id') id): Promise<string> {
    this.customergroupService.deleteCustomerGroup(id);
    return 'customergroup deleted';
  }
}
