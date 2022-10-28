/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  allCompany() {
    return this.companyService.getAllCompany();
  }
  @Post()
  async createCompany(@Body() companyDto: CompanyDto) {
    return await this.companyService.createCompany(companyDto);
  }

  @Get(':id')
  companybyId(@Param('id') id: string) {
    return this.companyService.getCompanyById(+id);
  }
  
}
