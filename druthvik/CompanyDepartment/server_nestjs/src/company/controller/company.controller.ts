import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';

import { CompanyService } from '../service/company.service';
import { Company } from '../entity/company.entity';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  async createCustomer(@Body() company: Company) {
    return await this.companyService.createCompany(company);
  }
  @Get()
  async findAllCompany(): Promise<Company[]> {
    return this.companyService.findAllCompany();
  }
  // @Get('/:id')
  // async findCustomerById(@Param('id') id): Promise<Company> {
  //   return this.companyService.findOneCompany(id);
  // }
  @Get('/:id')
  getByValue(@Param('id') id: string) {
    return this.companyService.getRoleByValue(id);
  }
}
