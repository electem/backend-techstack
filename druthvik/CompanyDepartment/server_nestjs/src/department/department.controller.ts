import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get()
  findAll() {
    return this.departmentService.findAllDepartments();
  }
  @Post()
  async create(@Body() companyDto: DepartmentDto) {
    return await this.departmentService.createDepartment(companyDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findDepartmentWithCompanyById(+id);
  }
}
