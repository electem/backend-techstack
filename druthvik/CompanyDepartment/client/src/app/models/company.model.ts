import { Department } from './department.model';
export class Company {
  id?: number;
  name: string;
  address?: string;
  department: Department[];
}
