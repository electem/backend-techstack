import { getManager, getRepository } from "typeorm";
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

// following code is to get the customer group by id with there associations(customers)
export const getCustomerGroup = async (id: number) => {
  const entityManager = getManager();
  const query = entityManager.createQueryBuilder(
    CustomerGroup,
    "customerGroups"
  );
  let customerGroupquery = await query
    .select(["customerGroups", "customers"])
    .leftJoinAndSelect("customerGroups.customers", "customers")
    .where("customerGroups.id = :id", { id: id })
    .getOne();
  return customerGroupquery;
};

export const updateCustomerGroup = async (
  payload: ICustomerGroupPayload
): Promise<ICustomerGroupPayload> => {
  const customerGroupRepository = getRepository(CustomerGroup);
  const customerGroup = new CustomerGroup();
  return customerGroupRepository.save({
    ...customerGroup,
    ...payload,
  });
};

export const deleteCustomerGroupById = async (
  id: number
): Promise<CustomerGroup | string | undefined> => {
  const customerGroupRepository = getRepository(CustomerGroup);
  const customerGgoup = await customerGroupRepository.delete({ id: id });
  if (customerGgoup) return "customerGroup deleted successfully";
};
