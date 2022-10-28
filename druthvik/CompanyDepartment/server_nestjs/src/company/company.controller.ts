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
import { CompanyService } from './company.service';
import { CompanyDto } from './company.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  findAll() {
    return this.companyService.getAllCompanyWithDepartment();
  }
  @Post()
  async create(@Body() companyDto: CompanyDto) {
    return await this.companyService.createCompany(companyDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findCompanyWithDepartmentById(+id);
  }

  @Put('/')
  async update(@Body() companyDto: CompanyDto) {
    return await this.companyService.updateCompany(companyDto);
  }
  @Delete('/:id')
  public async deleteCompany(@Param('id') id: string): Promise<void> {
    const company = this.companyService.deleteCompany(+id);
    if (!company) {
      throw new NotFoundException('User does not exist!');
    }
    return company;
  }
}
