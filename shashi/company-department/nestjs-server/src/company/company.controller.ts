/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Company } from './company.model';
import { CompanyService } from './company.service';
import { CompanyDto } from './company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  async createCompany(@Body() company: CompanyDto) {
    return await this.companyService.createCompany(company);
  }
  @Get()
  async getCompanies(): Promise<Array<Company>> {
    return this.companyService.getAllCompanyWithDepartment();
  }
  @Get('/:id')
  async findOneCompany(@Param('id') id): Promise<Company> {
    return this.companyService.findOneCompany(id);
  }
  @Put('/')
  async updateCompany(@Body() companyDto: CompanyDto) {
    return await this.companyService.updateCompany(companyDto);
  }
  @Delete('/:id')
  public async deleteCompany(@Param('id') id: string): Promise<void> {
    const company = this.companyService.deleteCompany(+id);
    if (!company) {
      throw new NotFoundException('department does not exist!');
    }
    return company;
  }
}
