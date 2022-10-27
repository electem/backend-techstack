/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { Department } from './department.entity';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Post()
  async createDepartment(@Body() company: DepartmentDto) {
    return await this.departmentService.createDepartment(company);
  }
  @Get()
  async findAllDepartment(): Promise<Array<Department>> {
    return this.departmentService.findAllDepartment();
  }
  @Get('/:id')
  async findOneDepartment(@Param('id') id): Promise<Department> {
    return this.departmentService.findOneDepartment(id);
  }
}
