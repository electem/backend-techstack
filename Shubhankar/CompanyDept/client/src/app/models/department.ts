import { Company } from "./company";

export interface Department {
    id?: number;
    name?: string;
    type?: string;
    createdAt?:Date;
    company?:Company[];
    
   
}
  