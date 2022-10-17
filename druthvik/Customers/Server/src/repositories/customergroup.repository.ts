import { getRepository } from 'typeorm';
import { customerGroup } from '../models/customergroup.model';

export interface ICustomerGroupPayload {
  name: string;
  description: string;
}

export const getCustomerGroup = async (): Promise<Array<customerGroup>> => {
  const customerGroupRepository = getRepository(customerGroup);
  return customerGroupRepository.find();
};

export const createCustomerGroup = async (
  payload: ICustomerGroupPayload,
): Promise<customerGroup> => {
  const customerGroupRepository = getRepository(customerGroup);
  const customergroup = new customerGroup();
  return customerGroupRepository.save({
    ...customergroup,
    ...payload,
  });
};
