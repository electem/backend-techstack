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
  @Get()
  async findAllCompany(): Promise<Department[]> {
    return this.departmentService.findAllDepartment();
  }
  @Get('/:id')
  async findCustomerById(@Param('id') id): Promise<Department> {
    return this.departmentService.findOneDepartment(id);
  }
}
