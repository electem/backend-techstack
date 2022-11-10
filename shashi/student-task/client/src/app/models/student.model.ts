import { School } from './school.model';
export class Student {
  id?: number;
  studentname?: string;
  address?: string;
  email?: string;
  gender?: string;
  phonenumber?: number | null;
  dob?: Date;
  school!: School;
}
