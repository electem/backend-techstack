import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Company } from '../entity/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: typeof Company,
  ) {}

  async createCompany(company: Company): Promise<Company> {
    try {
      const createcompany = new this.companyRepository({
        id: company.id,
        name: company.name,
        address: company.address,
      });
      return await createcompany.save();
    } catch (error) {
      throw new HttpException(
        'Error creating customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
