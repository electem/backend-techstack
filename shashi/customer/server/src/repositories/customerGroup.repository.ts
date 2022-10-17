import { getRepository } from "typeorm";
import { CustomerGroup } from "../models";

export interface ICustomerGroupPayload {
  groupname: string;
  description: string;
}

export const getCustomerGroups = async (): Promise<Array<CustomerGroup>> => {
  const customerGroupRepository = getRepository(CustomerGroup);
  return customerGroupRepository.find();
};
