import { Get, Route, Tags,Post,Path,Body} from "tsoa";
import {Employee} from '../models/employee'
import {  getEmployee ,createEmployee,getEmployees,IEmployeeData } from "../repositories/employee.repository";

@Route("employees")
@Tags("employee")
export default class EmployeeController {
  @Get("/")
  public async getEmployee(): Promise<Array<Employee>> {
    return getEmployee()
  }
  @Post("/")
  public async createEmployee(@Body() body: IEmployeeData): Promise<Employee> {
    return createEmployee(body)
  }

  @Get("/:id")
  public async getEmployees(@Path() id: string): Promise<Employee | null> {
    return getEmployees(Number(id))
  }
}

