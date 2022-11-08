import { School } from './school.model';
export class Teacher {
  id?: number;
  teachername!: string;
  address!: string;
  email!: string;
  gender?: string;
  school!: School[];
}
