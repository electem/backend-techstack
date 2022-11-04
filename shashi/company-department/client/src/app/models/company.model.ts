import { Department } from './department.model';
export class Company {
  id?: number;
  companyname?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
  email?: string;
  department?: Department[];
}
