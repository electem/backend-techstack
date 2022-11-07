import { Student } from './student.model';
import { Teacher } from './teacher.model';

export class School {
  id?: number;
  name?: string;
  address?: string;
  createdAt?: string;
  teacher?: Teacher[];
  student?: Student[];
}
