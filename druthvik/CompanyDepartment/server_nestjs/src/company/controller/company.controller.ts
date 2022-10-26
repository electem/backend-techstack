import { Body, Controller, Post } from '@nestjs/common';

import { CompanyService } from '../service/company.service';
import { Company } from '../entity/company.entity';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  async createCustomer(@Body() company: Company) {
    return await this.companyService.createCompany(company);
  }
}
