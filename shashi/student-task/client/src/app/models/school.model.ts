import { Teacher } from './teacher.model';
import { Student } from './student.model';
export class School {
  schoolid?: number;
  schoolname?: string;
  address?: string;
  createdAt?: Date;
  teacher: Teacher[] = [];
  students!: Student[];
}
