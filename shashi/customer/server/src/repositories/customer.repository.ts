import { getRepository } from "typeorm";
import { Customer } from "../models/customer";

export interface ICustomerPayload {
  customername: string;
  status: string;
  street: string;
  postalcode: string;
  phonenumber: number;
}

export const getCustomers = async (): Promise<Array<Customer>> => {
  const customerRepository = getRepository(Customer);
  return customerRepository.find();
};
