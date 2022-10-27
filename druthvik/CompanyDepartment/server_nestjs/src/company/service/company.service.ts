import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Company } from '../entity/company.entity';
import { Department } from 'src/department/entity/department.entity';
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

  async findAllCompany(): Promise<Company[]> {
    return this.companyRepository.findAll<Company>();
  }

  findCustomerGroupById(id: string): Promise<Company> {
    return this.companyRepository.findOne({
      include: {
        model: Department,

        through: {
          attributes: [],
        },
      },

      where: {
        id,
      },
    });
  }
  async getRoleByValue(id: string) {
    const role = await this.companyRepository.findOne({ where: { id } });
    return role;
  }
}
