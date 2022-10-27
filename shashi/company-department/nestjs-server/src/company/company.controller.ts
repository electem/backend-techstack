/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Company } from './company.model';
import { CompanyService } from './company.service';
import { CompanyDto } from './company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  async createCompany(@Body() company: CompanyDto) {
    return await this.companyService.createCompany(company);
  }
  @Get()
  async getCompanies(): Promise<Array<Company>> {
    return this.companyService.findAllCompany();
  }
  @Get('/:id')
  async findOneCompany(@Param('id') id): Promise<Company> {
    return this.companyService.findOneCompany(id);
  }
}
