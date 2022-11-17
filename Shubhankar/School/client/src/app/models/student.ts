import { Image } from './image';
import { School } from './school';

export interface Student {
  studentid?: number;
  studentname?: string;
  address?: string;
  phonenumber?: string;
  email?: string;
  gender?: string;
  file?:Image
  dateofbirth?: string;
  createdAt?: Date;
  school?: School;
}
