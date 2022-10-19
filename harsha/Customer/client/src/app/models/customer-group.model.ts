import { Customer } from './customer.model';

export interface CustomerGroup {
  id?: number;
  name?: string;
  description?: string;
  createdDate?: string;
  updatedDate?: string;
  customers?: Customer[];
}
