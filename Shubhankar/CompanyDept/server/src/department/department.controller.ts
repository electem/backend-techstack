/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dto/depertment.dto';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @UseGuards(AuthGuard('local'))
  @Get()
  allDepartment() {
    return this.departmentService.getAllDepartments();
  }

 @UseGuards(AuthGuard('local'))
  @Post()
  async create(@Body() companyDto: DepartmentDto) {
    return await this.departmentService.createDepartment(companyDto);
  }

  @UseGuards(AuthGuard('local'))
  @Get(':id')
  departmentbyId(@Param('id') id: string) {
    return this.departmentService.findDepartmentById(+id);
  }

   @UseGuards(AuthGuard('local'))
  @Put('/')
  async updateDepartment(@Body() companyDto: DepartmentDto) {
    return await this.departmentService.updateDepartment(companyDto);
  }
}
