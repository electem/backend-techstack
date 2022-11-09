import { Student } from './student';
import { Teacher } from './teacher';

export interface School {
  id?: number;
  schoolname?: string;
  address?: string;
  teachers?: Teacher[];
  students?: Student[];
  createdAt?: Date;
}
