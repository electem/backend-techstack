import { createCustomer } from './customer.model';
export class customerGroup {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  customers?: createCustomer[];
}
