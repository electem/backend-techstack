import { File } from './file.model';
import { School } from './school.model';

export interface Student {
  id?: number;
  name?: string;
  gender?: string;
  dateOfBirth?: Date;
  address?: string;
  email?: string;
  phoneNo?: number;
  createdDate?: string;
  school?: School;
  file?: File;
}
