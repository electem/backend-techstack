import {getRepository} from "typeorm";
import {CustomerGroup} from '../models/customergroup'

export interface ICustomerGroupData {
    name: string;
    description: string;
}

    export   const getCustomerGroup  = async () :Promise<Array<CustomerGroup>> => {
  const CustomerRepository = getRepository(CustomerGroup);
  return CustomerRepository.find()
    }

  export const createCustomerGroup = async (customerload: ICustomerGroupData) :Promise<CustomerGroup> => {
    const CustomerRepository = getRepository(CustomerGroup);
    const customer = new CustomerGroup()
    return CustomerRepository.save({
      ...customer,
      ...customerload
    })
  }