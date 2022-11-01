import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './department.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get()
  findAll() {
    return this.departmentService.getAllDepartmentWithCompany();
  }

  @Post()
  async create(@Body() departmentDto: DepartmentDto) {
    return await this.departmentService.createDepartment(departmentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findDepartmentWithCompanyById(+id);
  }

  @Put('/')
  async update(@Body() companyDto: DepartmentDto) {
    return await this.departmentService.updateDepartment(companyDto);
  }

  @Delete('/:id')
  public async deleteCompany(@Param('id') id: string): Promise<void> {
    const company = this.departmentService.deleteDepartment(+id);
    if (!company) {
      throw new NotFoundException('User does not exist!');
    }
    return company;
  }
}
