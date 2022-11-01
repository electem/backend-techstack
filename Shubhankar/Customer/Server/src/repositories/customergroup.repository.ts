import { getManager, getRepository } from "typeorm";
import { CustomerGroup } from "../models/customergroup";

export interface ICustomerGroupData {
  name: string;
  description: string;
}

export const getCustomerGroups = async (): Promise<Array<CustomerGroup>> => {
  const entityManager = getManager();
  let group = [];
  const query = entityManager.createQueryBuilder(
    CustomerGroup,
    "customergroups"
  );
  group = await query
    .select(["customergroups", "customers"])
    .leftJoinAndSelect("customergroups.customers", "customers")
    .getMany();
  return group;
};

export const createCustomerGroup = async (
  customerload: ICustomerGroupData
): Promise<CustomerGroup> => {
  const CustomerRepository = getRepository(CustomerGroup);
  const customer = new CustomerGroup();
  return CustomerRepository.save({
    ...customer,
    ...customerload,
  });
};

export const updateCustomerGroup = async (
  customerload: ICustomerGroupData
): Promise<CustomerGroup> => {
  const CustomerRepository = getRepository(CustomerGroup);
  const customer = new CustomerGroup();
  return CustomerRepository.save({
    ...customer,
    ...customerload,
  });
};

export const getCustomerGroup = async (id: number) => {
  const entityManager = getManager();
  const query = entityManager.createQueryBuilder(
    CustomerGroup,
    "customergroups"
  );
  let customergroupquery = await query
    .select(["customergroups", "customers"])
    .leftJoinAndSelect("customergroups.customers", "customers")
    .where("customergroups.id = :id", { id: id })
    .getOne();
  return customergroupquery;
};

export const deleteCustomerGroup = async (
  id: number
): Promise<CustomerGroup | string> => {
  const customerRepository = getRepository(CustomerGroup);
  const customergroup = await customerRepository.delete({ id: id });
  if (customergroup) return "deleted";
  return customergroup;
};
