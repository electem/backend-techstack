/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Department } from './department.entity';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './department.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Post()
  async createDepartment(@Body() company: DepartmentDto) {
    return await this.departmentService.createDepartment(company);
  }
  @Get()
  async getAllDepartmentWithCompany(): Promise<Array<Department>> {
    return this.departmentService.getAllDepartmentWithCompany();
  }
  @Get('/:id')
  async findOneDepartment(@Param('id') id): Promise<Department> {
    return this.departmentService.findOneDepartment(id);
  }
  @Put('/')
  async updateDepartment(@Body() departmentDto: DepartmentDto) {
    return await this.departmentService.updateDepartment(departmentDto);
  }
  @Delete('/:id')
  public async deleteCompany(@Param('id') id: string): Promise<void> {
    const department = this.departmentService.deleteDepartment(+id);
    if (!department) {
      throw new NotFoundException('department does not exist!');
    }
    return department;
  }
}
