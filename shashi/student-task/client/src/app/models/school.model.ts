import { Teacher } from './teacher.model';
export class School {
  id?: number;
  schoolname?: string;
  address?: string;
  createdAt?: Date;
  teacher!: Teacher[];
}
