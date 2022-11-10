import { Student } from './student.model';
export class Image {
  id?: number;
  fieldname?: string;
  encoding?: string;
  mimetype?: string;
  originalname?: string;
  size?: number;
  buffer?: Uint8Array;
  students?: Student;
}
