import { Employee } from "../models/employee";
import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { IEmployeePayload } from "../repositories/employee.repository";
import { EmployeeDetils } from "../models/EmployeeDetails";

@Route("employees")
@Tags("employees")
export default class EmployeeController {
  
  @Post("/")
  public async createEmployees(
    @Body() body: IEmployeePayload
  ): Promise<Employee> {
    const employee = {
      name: body.name,
      address: body.address,
    };
    return employee as Employee;
  }

  @Get("/:id")
  public async getEmployees(@Path() id: string): Promise<Employee> {
    const employeedata = {
      id: +id,
      name: "ram",
      address: "btm",
    };
    return employeedata as Employee;
  }

  @Put("/:id")
  public async updateEmployee(
    @Path() id: string,
    @Body() body: IEmployeePayload
  ): Promise<Employee> {
    const updateemployee = {
      name: body.name,
      address: body.address,
    };
    return updateemployee as Employee;
  }

  @Post("/employee")
  public async createEmployee(
    @Body() body: IEmployeePayload
  ): Promise<EmployeeDetils> {
    const employee = {
      name: body.name,
      address: body.address,
      gender: body.gender,
    };
    console.log(employee);
    return employee as EmployeeDetils;
  }
}
