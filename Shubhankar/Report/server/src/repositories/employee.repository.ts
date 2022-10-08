import { getRepository } from "typeorm";
import { Employee } from "../models/employee"; 

export interface IEmployeePayload {
    id: number;
    name: string;
    address:string;
    gender:string;
   }
  
  export const getEmployees  = async (id: number) :Promise< Employee| null> => {
    const EmployeeRepository = getRepository(Employee);
    const employee = await EmployeeRepository.findOne({id: id})
    if (!employee) return null
    return employee
    }
    
    export const updateEmployee = async (payload: IEmployeePayload): Promise<Employee> => {
    const employeeRepository = getRepository(Employee);
    const employee = new Employee();
    return employeeRepository.save({
      ...employee,
      ...payload,
    });
  };

  export const deleteEmployees = async (payload: IEmployeePayload) :Promise<Employee> => {
    const EmployeeRepository = getRepository(Employee);
    const Employeedata = new Employee()
    return EmployeeRepository.save({
      ...Employeedata,
      ...payload
    })
 }