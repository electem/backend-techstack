/* eslint-disable prettier/prettier */
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Customer } from '../entity/customer.entity';
import { Unit } from '../../unit/entity/unit.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMERS_REPOSITORY')
    private customersRepository: typeof Customer,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customersRepository.findAll<Customer>();
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    try {
      const createCustomer = new this.customersRepository({
        id: customer.id,
        name: customer.name,
        phonenumber: customer.phonenumber,
        address: customer.address,
        status: customer.status,
      });
      return await createCustomer.save();
    } catch (error) {
      throw new HttpException(
        'Error creating customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<Customer> {
    return this.customersRepository.findOne({
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
      const customer = await this.findOne(id);
      (customer.name = updateCustomer.name),
        (customer.phonenumber = updateCustomer.phonenumber),
        (customer.address = updateCustomer.address),
        (customer.status = updateCustomer.status);
      return await customer.save();
    } catch (error) {
      throw new HttpException(
        'Error updating customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async update2(id, data, unit: Unit) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.customersRepository.update(
        { ...data, unit },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }

  async deleteCustomer(id: string) {
    try {
      return this.customersRepository.destroy({
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

  async update(user, id): Promise<any> {
    console.log('id, user', id, user);
    try {
      const updatedUser = await this.customersRepository.update(
        { ...user },
        { where: { id: id } },
      );

      console.log('updatedUser ', updatedUser);

      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new Error('User Update Failed');
    }
  }
}
