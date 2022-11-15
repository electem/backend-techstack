import { Files } from './file.model';
import { School } from './school.model';
export class Student {
  studentid?: number;
  name?: string;
  address?: string;
  phonenumber?: number;
  email?: string;
  gender?: string;
  createdAt?: string;
  dateofbirth?: Date;
  originalname?: string;
  school?: School;
}
