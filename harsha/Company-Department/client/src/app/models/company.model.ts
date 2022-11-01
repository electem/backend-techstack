import { Department } from './department.model';

export interface Company {
  id?: number;
  name?: string;
  address?: string;
  email?: string;
  phoneNo?: number;
  createdDate?: string;
  departments?: Department[];
}
