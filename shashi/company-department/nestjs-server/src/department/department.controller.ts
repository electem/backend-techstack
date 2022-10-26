/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Department } from './department.entity';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async createDepartment(@Body() department: Department) {
    return await this.departmentService.createDepartment(department);
  }
  @Get()
  async getDepartments(): Promise<Array<Department>> {
    return this.departmentService.getDepartments();
  }
}
