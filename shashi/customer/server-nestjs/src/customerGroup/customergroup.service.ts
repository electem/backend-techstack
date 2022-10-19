/* eslint-disable prettier/prettier */
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CustomerGroup } from './customergroup.entity';

@Injectable()
export class CustomerGroupService {
  constructor(
    @Inject('Customergroup')
    private customerGroupModel: typeof CustomerGroup,
  ) {}

  async getCustomerGroups(): Promise<Array<CustomerGroup>> {
    return this.customerGroupModel.findAll();
  }

  async createCustomergroup(
    customerGroup: CustomerGroup,
  ): Promise<CustomerGroup> {
    try {
      const createdCustomergroup = new this.customerGroupModel({
        groupname: customerGroup.groupname,
        description: customerGroup.description,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      });
      return await createdCustomergroup.save();
    } catch (error) {
      throw new HttpException(
        'Error creating customerGroup',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findCustomerGroupById(id: string): Promise<CustomerGroup> {
    return this.customerGroupModel.findOne({
      where: {
        id,
      },
    });
  }

  async updateCustomerGroup(
    updatedCustomergroup: CustomerGroup,
    id: string,
  ): Promise<CustomerGroup> {
    try {
      const customergroup = await this.findCustomerGroupById(id);
      (customergroup.groupname = updatedCustomergroup.groupname),
        (customergroup.description = updatedCustomergroup.description),
        (customergroup.updatedAt = new Date().getTime());
      return await customergroup.save();
    } catch (error) {
      throw new HttpException(
        'Error updating customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteCustomerGroup(id: string) {
    try {
      return this.customerGroupModel.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error deleting customerGroup',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
