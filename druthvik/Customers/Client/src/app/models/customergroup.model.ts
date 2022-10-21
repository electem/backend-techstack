import { createCustomer } from './customer.model';
export class customerGroup {
  id?: number;
  name?: string;
  descritption?: string;
  createdAt?: string;
  updatedAt?: string;
  customers?: createCustomer[];
}
