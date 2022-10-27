import { Company } from './company.model';

export class Department {
  id?: number;
  name: string;
  type: string;
  company: Company[];
}
