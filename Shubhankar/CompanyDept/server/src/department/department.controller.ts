/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dto/depertment.dto';


@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get()
  allDepartment() {
    return this.departmentService.getAllDepartments();
  }
  @Post()
  async create(@Body() companyDto: DepartmentDto) {
    return await this.departmentService.createDepartment(companyDto);
  }

  @Get(':id')
  departmentbyId(@Param('id') id: string) {
    return this.departmentService.findDepartmentById(+id);
  }
}