import { getRepository } from 'typeorm';
import { customerModel } from '../models/customer.model';

export interface ICustomerPaylod {
  name: string;
  phonenumber: number;
  address?: string;
}

export const createCustomer = async (
  payload: ICustomerPaylod,
): Promise<customerModel> => {
  const customerRepository = getRepository(customerModel);
  const customer = new customerModel();
  return customerRepository.save({
    ...customer,
    ...payload,
  });
};

export const getCustomers = async (): Promise<Array<customerModel>> => {
  const customerRepository = getRepository(customerModel);
  return customerRepository.find();
};
