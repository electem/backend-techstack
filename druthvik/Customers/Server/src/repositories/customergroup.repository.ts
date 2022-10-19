import { getManager, getRepository } from 'typeorm';
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
// export const getCustomerGroupById = async (
//   id: number,
// ): Promise<customerGroup | null> => {
//   const customerGroupRepository = getRepository(customerGroup);
//   const customergroup = await customerGroupRepository.findOne({ id: id });
//   if (!customergroup) return null;
//   return customergroup;
// };
export const getCustomerGroupById = async (id: number) => {
  const entityManager = getManager();
  const query = entityManager.createQueryBuilder(
    customerGroup,
    'customergroup',
  );
  const customergroup = await query
    .select(['customergroup', 'customers'])
    .leftJoinAndSelect('customergroup.customers', 'customers')
    .where('customergroup.id = :id', { id: id })
    .getOne();

  return customergroup;
};

export const updateCustomerGroup = async (
  payload: ICustomerGroupPayload,
): Promise<ICustomerGroupPayload> => {
  const customerGroupRepository = getRepository(customerGroup);
  const customer = new customerGroup();
  return customerGroupRepository.save({
    ...customer,
    ...payload,
  });
};

export const deleteCustomerGroup = async (
  id: number,
): Promise<customerGroup | string> => {
  const customerGroupRepository = getRepository(customerGroup);
  const customergroup = await customerGroupRepository.delete({ id: id });
  if (customergroup) return 'deleted';
};
