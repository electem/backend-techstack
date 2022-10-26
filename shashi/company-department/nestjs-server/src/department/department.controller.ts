/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { Department } from './department.entity';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async createDepartment(@Body() department: Department) {
    return await this.departmentService.createDepartment(department);
  }
}
