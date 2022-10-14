import {getRepository} from "typeorm";
import {Customer} from '../models/customer'

export interface ICustomerData {
  name: string;
  status: string;
  address:string;
  phonenumber:number
}

export const getCustomer  = async () :Promise<Array<Customer>> => {
  const CustomerRepository = getRepository(Customer);
  return CustomerRepository.find()
}
export const createCustomer  = async (customerload: ICustomerData) :Promise<Customer> => {
  const EmployeeRepository = getRepository(Customer);
  const customer = new Customer()
  return EmployeeRepository.save({
    ...customer,
    ...customerload
  })
}