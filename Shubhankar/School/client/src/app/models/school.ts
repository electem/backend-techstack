import { Student } from "./student";
import { Teacher } from "./teacher";

export interface School{
    schoolname?:string;
     address?:string;
     teachers?:Teacher[];
     students?:Student[];
 
 }