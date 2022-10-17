import { Customer } from './customer.model';

export class CustomerGroup {
  id?: number;
  groupname?: string;
  description?: string;
  createdat?: Date;
  updatedAt?: Date;
  customers?: Customer[];
}
