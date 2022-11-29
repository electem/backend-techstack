import { Student } from "./student";
import { Teacher } from "./teacher";


export class School {
  id?: number;
  name?: string;
  address?: string;
 teachers?:Teacher[];
 students?:Student[];
 
}
