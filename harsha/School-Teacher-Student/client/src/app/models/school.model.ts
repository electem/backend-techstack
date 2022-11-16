import { Student } from './student.model';
import { Teacher } from './teacher.model';

export class School {
  schoolId?: number;
  schoolName?: string;
  address?: string;
  createdDate?: string;
  teachers?: Teacher[];
  students?: Student[];
}
