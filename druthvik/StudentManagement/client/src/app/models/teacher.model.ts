import { Student } from './student.model';

export class Teacher {
  id?: number;
  name?: string;
  address?: string;
  phonenumber?: number;
  email?: string;
  gender?: string;
  createdAt?: string;
  student?: Student[];
}
