import { School } from './school';

export interface Student {
  id?: number;
  studentname?: string;
  address?: string;
  phonenumber?: string;
  email?: string;
  gender?: string;
  dateofbirth?: Date;
  createdAt?: Date;
  schools?: School;
}
