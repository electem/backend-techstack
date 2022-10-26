/* eslint-disable prettier/prettier */
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Company } from './company.model';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('company')
    private companyModel: typeof Company,
  ) {}

  async createCompany(company: Company): Promise<Company> {
    try {
      const createdCompany = new this.companyModel({
        companyname: company.companyname,
        address: company.address,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      });
      return await createdCompany.save();
    } catch (error) {
      throw new HttpException('Error creating company', HttpStatus.BAD_REQUEST);
    }
  }
  async getCompanies(): Promise<Array<Company>> {
    return this.companyModel.findAll();
  }
}
