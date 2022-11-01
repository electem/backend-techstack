/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CustomerDto } from './dto/customer.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: typeof Customer,
  ) {}

  async createCustomer(id: string, customers: CustomerDto) {
    const customer = new Customer();
    customer.id = id;
    customer.name = customers.name;
    customer.status = customers.status;
    customer.address = customers.address;
    customer.phonenumber = customers.phonenumber;

    return customer.save();
  }

  async findAll() {
    const customers = await this.customerRepository.findAll<Customer>();
    return customers;
  }

  async findCustomerbyid(id: string): Promise<Customer> {
    return this.customerRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateCustomer(id: string, customers: CustomerDto): Promise<Customer> {
    const customer = await this.findCustomerbyid(id);
    customer.name = customers.name;
    customer.status = customers.status;
    customer.address = customers.address;
    customer.phonenumber = customers.phonenumber;

    return await customer.save();
  }

  async deleteCustomer(id: string) {
    return this.customerRepository.destroy({
      where: {
        id,
      },
    });
  }
}
