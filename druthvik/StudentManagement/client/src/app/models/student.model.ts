import { Files } from './file.model';
import { School } from './school.model';
export class Student {
  id?: number;
  name?: string;
  address?: string;
  phonenumber?: number;
  email?: string;
  gender?: string;
  createdAt?: string;
  dateofbirth?: Date;
  school?: School;
  file?: Files;
}
