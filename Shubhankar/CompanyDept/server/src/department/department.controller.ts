/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dto/depertment.dto';

@UseGuards(AuthGuard('jwt'))
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

  @Put('/')
  async updateDepartment(@Body() companyDto: DepartmentDto) {
    return await this.departmentService.updateDepartment(companyDto);
  }

  @Delete('/:id')
  public async deleteCompany(@Param('id') id: string): Promise<void> {
    const department = this.departmentService.deleteDepartmentById(+id);
    if (!department) {
      throw new NotFoundException('department not exist');
    }
    return department;
  }
}
