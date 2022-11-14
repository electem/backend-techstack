import { School } from './school.model';
export class Teacher {
  teacherid?: number;
  teachername!: string;
  address!: string;
  email!: string;
  gender?: string;
  school?: School[];
}
