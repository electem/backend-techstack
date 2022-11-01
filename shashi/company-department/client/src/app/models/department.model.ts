import { Company } from './company.model';
export class Department {
  id?: number;
  departmentname?: string;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
  company?: Company[];
}
