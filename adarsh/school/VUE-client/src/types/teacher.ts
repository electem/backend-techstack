import { School } from "./school";

export class Teacher {
  id?: number;
  name?: string;
  address?: string;
  email?: string;
  gender?:string;
  phone?:number;
  schools?:School[];
 
}
