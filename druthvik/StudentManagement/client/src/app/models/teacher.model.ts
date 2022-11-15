import { Files } from './file.model';
import { School } from './school.model';

export class Teacher {
  teacherid?: number;
  name?: string;
  address?: string;
  phonenumber?: number;
  email?: string;
  gender?: string;
  createdAt?: string;
  school?: School[];
}
