import { Files } from './file.model';
import { School } from './school.model';

export class Teacher {
  id?: number;
  name?: string;
  address?: string;
  phonenumber?: number;
  email?: string;
  gender?: string;
  createdAt?: string;
  school?: School[];
  file?: Files[];
}
