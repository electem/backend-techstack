import { EmployeeDetils } from "../models/EmployeeDetails";
import { getRepository } from "typeorm";

export interface IEmployeeDetailPayload {
    id: number;
    name: string;
    address:string;
    gender:string;
   }

   export const createEmployee = async (payload: IEmployeeDetailPayload): Promise<EmployeeDetils> => {
    const EmployeeRepository = getRepository(EmployeeDetils);
    const employee = new EmployeeDetils();
    return EmployeeRepository.save({
      ...employee,
      ...payload,
    });
  };
  
  