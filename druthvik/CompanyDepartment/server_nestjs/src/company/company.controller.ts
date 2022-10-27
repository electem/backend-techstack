import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './company.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  findAll() {
    return this.companyService.findAllCompany();
  }
  @Post()
  async create(@Body() companyDto: CompanyDto) {
    return await this.companyService.createCompany(companyDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findCompanyWithDepartmentById(+id);
  }
}
