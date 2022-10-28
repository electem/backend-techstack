import { Company } from './company.model';

export interface Department {
  id?: number;
  name?: string;
  type?: string;
  createdDate?: string;
  companies?: Company[];
}
