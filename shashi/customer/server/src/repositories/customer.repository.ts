import { getRepository } from "typeorm";
import { Customer } from "../models/customer";

export interface ICustomerPayload {
  customername: string;
  status: string;
  street: string;
  postalcode: string;
  phonenumber: number;
}
export const createCustomer = async (
  payload: ICustomerPayload
): Promise<Customer> => {
  const UserCustomer = getRepository(Customer);
  const user = new Customer();
  return UserCustomer.save({
    ...user,
    ...payload,
  });
};

export const getCustomers = async (): Promise<Array<Customer>> => {
  const customerRepository = getRepository(Customer);
  return customerRepository.find();
};
