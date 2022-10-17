import {getRepository} from "typeorm";
import {Customer} from '../models/customer'

export interface ICustomerData {
  name: string;
  status: string;
  address:string;
  phonenumber:number
}

export const getCustomers  = async () :Promise<Array<Customer>> => {
  const CustomerRepository = getRepository(Customer);
  return CustomerRepository.find()
}
export const createCustomer  = async (customerload: ICustomerData) :Promise<Customer> => {
  const CustomerRepository = getRepository(Customer);
  const customer = new Customer()
  return CustomerRepository.save({
    ...customer,
    ...customerload
  })
}
export const getCustomer  = async (id: number) :Promise<Customer | null> => {
  const CustomerRepository = getRepository(Customer);
  const customer = await CustomerRepository.findOne({id: id})
  if (!customer) return null
  return customer
}
export const updateCustomer  = async (payload: ICustomerData) :Promise<Customer> => {
  const CustomerRepository = getRepository(Customer);
  const update = new Customer()
  return CustomerRepository.save({
    ...update,
    ...payload
  })
}