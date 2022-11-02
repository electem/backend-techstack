import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './company.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompanyMail } from './companymail.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

//@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(
    private companyService: CompanyService,
    private mailService: MailerService,
  ) {}
  companyDetails: CompanyMail = {
    name: '',
    email: '',
    address: '',
    department: [],
  };
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

  @Get('email/:id')
  async plainTextEmail(@Param('id') id: string) {
    const company = await this.companyService.findCompanyWithDepartmentById(
      +id,
    );
    const response = await this.mailService.sendMail({
      to: company.email,
      from: 'druthvik@electems.com',
      subject: 'Thank you for registering for company',
      text: 'welcome to' + company.name,
    });
    return response;
  }
  @Post('html-email/:id')
  async postHTMLEmail(@Param('id') id: string) {
    const companybyid = await this.companyService.findCompanyWithDepartmentById(
      +id,
    );
    this.companyDetails.name = companybyid.name;
    for (let i = 0; i < companybyid.department.length; i++) {
      this.companyDetails.department.push(companybyid.department[i].name);
    }
    const response = await this.mailService.sendMail({
      to: companybyid.email,
      from: 'druthvik@electems.com',
      subject: 'send mail with attachment',
      template: 'company',
      context: {
        company: this.companyDetails,
      },
      attachments: [
        {
          path: join(__dirname, '../../src/mails/electems.pdf'),
          filename: 'electems.pdf',
          contentDisposition: 'attachment',
        },
      ],
    });
    return response;
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
