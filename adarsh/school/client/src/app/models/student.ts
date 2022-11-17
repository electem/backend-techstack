import { School } from "./school";
import { File } from "./file";

export class Student {
  id?: number;
  name?: string;
  address?: string;
  email?: string;
  gender?:string;
  phone?:number;
  dateOfBirth?:string;
  schools?:School;
  files?:File;
 
}
