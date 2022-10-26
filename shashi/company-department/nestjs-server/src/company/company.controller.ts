/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Company } from './company.model';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(@Body() company: Company) {
    return await this.companyService.createCompany(company);
  }
  @Get()
  async getCompanies(): Promise<Array<Company>> {
    return this.companyService.getCompanies();
  }
}