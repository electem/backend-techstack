import { Department } from "./department";

export interface Company {
    id?: number;
    name?: string;
    address?: string;
    email?:string;
    phone?:number;
    createdAt?:Date;
   department?:Department[]
    
  }
  