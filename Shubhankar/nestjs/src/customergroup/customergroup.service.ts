/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Customergroup } from './customergroup.entity';
import { CustomergroupDto } from './dto/customergroup';

@Injectable()
export class CustomergroupService {
  constructor(
    @Inject('CustomergroupRepository')
    private readonly customergroupRepository: typeof Customergroup,
  ) {}

  async createCustomer(id: number, customers: CustomergroupDto) {
    const customer = new Customergroup();
    customer.name = customers.name;
    customer.description = customers.description;
    return customer.save();
  }

  async findAll() {
    const customergroup =
      await this.customergroupRepository.findAll<Customergroup>();
    return customergroup;
  }

  async findCustomergroupbyid(id: string): Promise<Customergroup> {
    return this.customergroupRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateCustomergroup(
    id: string,
    customers: CustomergroupDto,
  ): Promise<Customergroup> {
    const customer = await this.findCustomergroupbyid(id);
    customer.name = customers.name;
    customer.description = customers.description;
    return await customer.save();
  }
  async deleteCustomergroup(id: string) {
    return this.customergroupRepository.destroy({
      where: {
        id,
      },
    });
  }
}
