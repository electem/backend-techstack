import { Student } from './student.model';
import { Teacher } from './teacher.model';

export class School {
  id?: number;
  name?: string;
  address?: string;
  createdDate?: string;
  teachers?: Teacher[];
  students?: Student[];
}
