import { Customer } from "./customer";

export interface Customergroup {
    id?:number;
    name?: string;
    description?: string;
    createdAt?:string;
   customers?:Customer[];
}
  
