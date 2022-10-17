import { getRepository } from "typeorm";
import { CustomerGroup } from "../models";

export interface ICustomerGroupPayload {
  groupname: string;
  description: string;
}
export const createCustomerGroup = async (
  payload: ICustomerGroupPayload
): Promise<CustomerGroup> => {
  const customerGroupRepository = getRepository(CustomerGroup);
  const group = new CustomerGroup();
  return customerGroupRepository.save({
    ...group,
    ...payload,
  });
};

export const getCustomerGroups = async (): Promise<Array<CustomerGroup>> => {
  const customerGroupRepository = getRepository(CustomerGroup);
  return customerGroupRepository.find();
};
