import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CustomerGroup } from '../entity/customergroup.entity';

@Injectable()
export class CustomerGroupService {
  constructor(
    @Inject('CUSTOMERS_GROUP_REPOSITORY')
    private customersGroupRepository: typeof CustomerGroup,
  ) {}

  async getCustomerGroup(): Promise<CustomerGroup[]> {
    return this.customersGroupRepository.findAll<CustomerGroup>();
  }

  async createCustomerGroup(customer: CustomerGroup): Promise<CustomerGroup> {
    try {
      const createCustomerGroup = new this.customersGroupRepository({
        name: customer.name,
        descritption: customer.descritption,
      });
      return await createCustomerGroup.save();
    } catch (error) {
      throw new HttpException(
        'Error creating customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findCustomerById(id: string): Promise<CustomerGroup> {
    return this.customersGroupRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateCustomerGroup(
    updateCustomer: CustomerGroup,
    id: string,
  ): Promise<CustomerGroup> {
    try {
      const customer = await this.findCustomerById(id);
      (customer.name = updateCustomer.name),
        (customer.descritption = updateCustomer.descritption);
      return await customer.save();
    } catch (error) {
      throw new HttpException(
        'Error updating customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteCustomerGroup(id: string) {
    try {
      return this.customersGroupRepository.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error deleting customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
