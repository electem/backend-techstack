import { Employee } from "../models/employee";
import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import {
  IEmployeePayload,
} from "../repositories/employee.repository";

@Route("employees")
@Tags("employees")
export default class EmployeeController {
  @Post("/")
  public async createEmployees(
    @Body() body: IEmployeePayload
  ): Promise<Employee> {
    var employee = {
      name: body.name,
      address: body.address,
    };
    return employee as Employee;
  }

  @Get("/:id")
  public async getEmployees(@Path() id: string): Promise<Employee> {
    var employeedata = {
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
    console.log("Id is " + id);
    var updateemployee = {
      name: body.name,
      address: body.address,
    };
    return updateemployee as Employee;
  }

  @Delete("/:id")
  public async deleteEmployee(@Path() id: string): Promise<string> {
    console.log(" deleted Id is " + id);
    return "employee deleted";
  }
}
