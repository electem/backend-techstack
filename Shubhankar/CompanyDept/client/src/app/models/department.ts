import { Company } from "./company";

export interface Department {
    id?: number;
    name?: String;
    type?: String;
    company?:Company[];
    
   
}
  