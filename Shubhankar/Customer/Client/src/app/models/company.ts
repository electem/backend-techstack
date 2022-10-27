import { Department } from "./department";

export interface Company {
    id?: number;
    name?: string;
    department?: string;
    address?: string;
    createdAt?:Date;
    departments?:Department[]
    
  }
  