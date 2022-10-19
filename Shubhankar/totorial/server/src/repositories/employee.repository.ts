import {getRepository} from "typeorm";
import {Employee} from '../models/employee'

export interface IEmployeeData {
    firstName: string;
    lastName: string;
    Companyid: number;
}

export const getEmployee  = async () :Promise<Array<Employee>> => {
  const EmployeeRepository = getRepository(Employee);
  return EmployeeRepository.find()
}
export const createEmployee  = async (Employeeload: IEmployeeData) :Promise<Employee> => {
  const EmployeeRepository = getRepository(Employee);
  const Employees = new Employee()
  return EmployeeRepository.save({
    ...Employees,
    ...Employeeload
  })
}

export const getEmployees  = async (id: number) :Promise<Employee | null> => {
  const EmployeeRepository = getRepository(Employee);
  const Employees = await EmployeeRepository.findOne({id: id})
  if (!Employees) return null
  return Employees
}