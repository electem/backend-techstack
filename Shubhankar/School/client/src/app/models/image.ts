import { Student } from "./student";

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