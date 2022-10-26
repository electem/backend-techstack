import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DepartmentService } from '../service/department.service';
import { Department } from '../entity/department.entity';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post()
  async createCustomer(@Body() department: Department) {
    return await this.departmentService.createDepartment(department);
  }
}
