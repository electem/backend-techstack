import { School } from './school.model';

export interface Teacher {
  id?: number;
  name?: string;
  gender?: string;
  address?: string;
  email?: string;
  phoneNo?: number;
  createdDate?: string;
  schools?: School[];
}
