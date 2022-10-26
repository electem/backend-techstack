/* eslint-disable prettier/prettier */
import { Company } from './company.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('CompanyRepository')
    private readonly companyRepository: typeof Company,
  ) {}

  async createCompany(id: number, companys: CompanyDto) {
    const company = new Company();
    company.id = id;
    company.name = companys.name;
    company.department = companys.department;
    company.address = companys.address;

    return company.save();
  }

  async getAllCompany() {
    const company = await this.companyRepository.findAll<Company>();
    return company;
  }
}
