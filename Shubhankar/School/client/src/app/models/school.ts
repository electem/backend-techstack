import { Student } from './student';
import { Teacher } from './teacher';

export interface School {
  schoolid?: number;
  schoolname?: string;
  address?: string;
  teachers?: Teacher[];
  students?: Student[];
  createdAt?: Date;
}
