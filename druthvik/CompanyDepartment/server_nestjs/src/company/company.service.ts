/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CompanyDto } from './company.dto';
import { PageRequest } from 'src/pagination/page.request.model';
import { Page } from 'src/pagination/page.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}
  public async findAllCompany(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  public async createCompany(companyDto: CompanyDto): Promise<Company> {
    try {
      return await this.companyRepository.save(companyDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async findCompanyWithDepartmentById(id: number) {
    const postWithQueryBuilder = await this.companyRepository
      .createQueryBuilder('company')
      .select(['company', 'department'])
      .leftJoinAndSelect('company.department', 'department')
      .where('company.id= :id', { id: id })
      .getOne();
    return postWithQueryBuilder;
  }
  async getAllCompanyWithDepartment() {
    const getAll = await this.companyRepository
      .createQueryBuilder('company')
      .select(['company', 'department'])
      .leftJoinAndSelect('company.department', 'department')
      .getMany();
    return getAll;
  }

  public async updateCompany(companyDto: CompanyDto): Promise<Company> {
    try {
      return await this.companyRepository.save(companyDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteCompany(id: number): Promise<void> {
    const comapany = await this.findCompanyWithDepartmentById(id);
    await this.companyRepository.remove(comapany);
  }
  public async getAllCompanyByPage(
    pageRequest: PageRequest,
  ): Promise<Page<Company>> {
    const result = await this.companyRepository.findAndCount({
      skip: (pageRequest.page - 1) * pageRequest.size,
      take: pageRequest.size,
    });
    return Page.from(result[0], result[1], pageRequest);
  }
}
