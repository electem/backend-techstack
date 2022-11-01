/* eslint-disable prettier/prettier */
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CompanyDto } from './dto/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiCreatedResponse({ type: Company })
  @Post()
  async createCompany(
    @Body() createCompanyDto: CompanyDto,
    @Req() request,
  ): Promise<Company> {
    return this.companyService.createCompany(request.id, createCompanyDto);
  }

  @Get()
  @ApiOkResponse({ type: [Company] })
  getAllcompany(): Promise<Company[]> {
    return this.companyService.getAllCompany();
  }
}
