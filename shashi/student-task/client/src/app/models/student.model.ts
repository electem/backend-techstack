import { Image } from './image.model';
import { School } from './school.model';
export class Student {
  studentid?: number;
  studentname?: string;
  address?: string;
  email?: string;
  gender?: string;
  phonenumber?: number;
  dob?: Date;
  school?: School;
  imageid?: Image['id'];
}
