/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Company } from './company.model';
import { CompanyDto } from './company.dto';
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  public async findAllCompany(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async getAllCompanyWithDepartment() {
    const getAll = await this.companyRepository
      .createQueryBuilder('company')
      .select(['company', 'department'])
      .leftJoinAndSelect('company.department', 'department')
      .getMany();
    return getAll;
  }

  public async createCompany(companyDto: CompanyDto): Promise<Company> {
    try {
      return await this.companyRepository.save(companyDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    const postWithRepository = await this.companyRepository.findOneBy({ id });
    return postWithRepository;
  }

  async findOneCompany(id: number) {
    const postWithQueryBuilder = await this.companyRepository
      .createQueryBuilder('company')
      .select(['company', 'department'])
      .leftJoinAndSelect('company.department', 'department')
      .where('company.id= :id', { id: id })
      .getOne();
    return postWithQueryBuilder;
  }

  public async updateCompany(companyDto: CompanyDto): Promise<Company> {
    try {
      return await this.companyRepository.save(companyDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  public async deleteCompany(id: number): Promise<void> {
    const comapany = await this.findOneCompany(id);
    await this.companyRepository.remove(comapany);
  }
}
