/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CompanyDto } from './dto/company.dto';


@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}
 
 async getAllCompanyDepartment() : Promise<Company[]> {
    const companywithdept = await this.companyRepository
      .createQueryBuilder('company')
      .select(['company', 'department'])
      .leftJoinAndSelect('company.department', 'department')
      .getMany();
    return companywithdept;
  }

public async createCompany(companyDto: CompanyDto): Promise<Company> {
    try {
      return await this.companyRepository.save(companyDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async getCompanyById(id: number) {
    const companyQueryBuilder = await this.companyRepository
      .createQueryBuilder('company')
      .select(['company', 'department'])
      .leftJoinAndSelect('company.department', 'department')
      .where('company.id= :id', { id: id })
      .getOne();
    return companyQueryBuilder;
  }
  
  public async updateCompany(companyDto: CompanyDto): Promise<Company> {
    try {
      return await this.companyRepository.save(companyDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteCompanyById(id: number): Promise<void> {
    const comapany = await this.getCompanyById(id);
    await this.companyRepository.remove(comapany);
  }
}