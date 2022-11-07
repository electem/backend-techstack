/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

 
  @Get()
  async allCompany(): Promise<Array<Company>>{
    return await this.companyService.getAllCompanyDepartment();
  }

  
  @Post()
  async createCompany(@Body() companyDto: CompanyDto) {
    return await this.companyService.createCompany(companyDto);
  }

 
  @Get(':id')
  companybyId(@Param('id') id: string) {
    return this.companyService.getCompanyById(+id);
  }

 
  @Put('/')
  async updateCompany(@Body() companyDto: CompanyDto) {
    return await this.companyService.updateCompany(companyDto);
  }
}
