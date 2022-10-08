import { EmployeeDetils } from "../models/EmployeeDetails";
import { getRepository } from "typeorm";
import { JsonSerializer } from "typescript-json-serializer";
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
//   export const createEmployees = async (payload: IEmployeePayload) :Promise<Employee> => {
//     const EmployeeRepository = getRepository(Employee);
//     const defaultSerializer = new JsonSerializer();
//     const Employeedata = new Employee()
//     const json = defaultSerializer.serialize(Employeedata);
//     return EmployeeRepository.save({
//       ...Employeedata,
//       ...payload
//     })
// }

// export const createEmployee = async (payload: IEmployeePayload): Promise<EmployeeDetils> => {
//   const EmployeeRepository = getRepository(EmployeeDetils);
//   const employee = new EmployeeDetils();
//   return EmployeeRepository.save({
//     ...employee,
//     ...payload,
//   });
// };


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