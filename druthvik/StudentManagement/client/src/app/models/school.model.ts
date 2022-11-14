import { Student } from './student.model';
import { Teacher } from './teacher.model';

export class School {
  schoolid?: number;
  name?: string;
  address?: string;
  createdAt?: string;
  teacher?: Teacher[];
  students?: Student[];
}
