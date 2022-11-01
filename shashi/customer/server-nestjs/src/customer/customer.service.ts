/* eslint-disable prettier/prettier */
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Customer } from './customer.entity';
import { Unit } from 'src/unit/unit.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('Customer')
    private customerModel: typeof Customer,
  ) {}

  async getCustomers(): Promise<Array<Customer>> {
    return this.customerModel.findAll();
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    try {
      const createdArticle = new this.customerModel({
        customername: customer.customername,
        status: customer.status,
        street: customer.street,
        postalcode: customer.postalcode,
        phonenumber: customer.phonenumber,
        units: customer.units,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      });
      return await createdArticle.save();
    } catch (error) {
      throw new HttpException(
        'Error creating customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findCustomerById(id: string): Promise<Customer> {
    return this.customerModel.findOne({
      where: {
        id,
      },
    });
  }

  async updateCustomer(
    updateCustomer: Customer,
    id: string,
  ): Promise<Customer> {
    try {
      const customer = await this.findCustomerById(id);
      (customer.customername = updateCustomer.customername),
        (customer.status = updateCustomer.status),
        (customer.street = updateCustomer.street),
        (customer.postalcode = updateCustomer.postalcode),
        (customer.phonenumber = updateCustomer.phonenumber),
        (customer.units = updateCustomer.units),
        (customer.updatedAt = new Date().getTime());
      return await customer.save();
    } catch (error) {
      throw new HttpException(
        'Error updating customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteCustomer(id: string) {
    try {
      return this.customerModel.destroy({
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
