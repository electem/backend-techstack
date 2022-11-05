/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
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
  UseGuards,
} from '@nestjs/common';
import { Company } from './company.model';
import { CompanyService } from './company.service';
import { CompanyDto } from './company.dto';
import { AuthGuard } from '@nestjs/passport';
import { MailerService } from '@nestjs-modules/mailer';
import { CompanyMail } from './companyEmail.model';
import { join } from 'path';
import * as fs from 'fs';
import hbs from 'handlebars';
import puppeteer from 'puppeteer';

//@UseGuards(AuthGuard())
@Controller('company')
export class CompanyController {
  companyDetails: CompanyMail = {
    name: '',
    email: '',
    address: '',
    department: [],
  };
  constructor(
    private readonly companyService: CompanyService,
    private mailService: MailerService,
  ) {}
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

  @Post('plain-text-email')
  async plainTextEmail() {
    var response = await this.mailService.sendMail({
      to: 'shashikiranss007@gmail.com',
      from: 'shashi@electems.com',
      subject: 'Plain Text Email ✔',
      text: 'Welcome NestJS Email Sending Tutorial',
    });
    return response;
  }

  @Post('/:id')
  async asyncsendEmailById(@Param('id') id) {
    const companyById = this.companyService.findOneCompany(id);
    var response = await this.mailService.sendMail({
      to: (await companyById).email,
      from: 'shashi@electems.com',
      subject: 'Email sending ✔',
      text: 'Welcome NestJS Email Sending Tutorial',
    });
    return response;
  }

  // to block of is used to send template in mail
  @Post('html-email/:id')
  async postHTMLEmail(@Param('id') id: string) {
    const companybyid = await this.companyService.findOneCompany(+id);
    this.companyDetails.name = companybyid.companyname;
    for (let i = 0; i < companybyid.department.length; i++) {
      this.companyDetails.department.push(
        companybyid.department[i].departmentname,
      );
    }
    const response = await this.mailService.sendMail({
      to: companybyid.email,
      from: 'shashi@electems.com',
      subject: 'send mail with attachment',
      template: 'superhero',
      context: {
        superhero: this.companyDetails,
      },
    });
    console.log(response);
    return { response, message: 'success' };
  }

  // to block of is used to conveting hbs file to pdf and send it as an attachment in mail
  @Post('html-email-pdf/:id')
  async postHTMLEmailPdf(@Param('id') id: string) {
    const companybyid = await this.companyService.findOneCompany(+id);
    const compile = async function (templatename, data) {
      const html = fs.readFileSync(
        join(__dirname, '../../src/mailsfolder/company.hbs'),
        'utf-8',
      );
      return hbs.compile(html)(companybyid);
    };
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    const content = compile('company', companybyid);
    await page.setContent(await content);
    await page.pdf({
      format: 'A4',
      path: join(__dirname, '../../src/mailsfolder/company.pdf'),
    });
    const response = await this.mailService.sendMail({
      to: companybyid.email,
      from: 'shashi@electems.com',
      subject: 'send mail with attachment',
      attachments: [
        {
          path: join(__dirname, '../../src/mailsfolder/company.pdf'),
          filename: 'electems.pdf',
          contentDisposition: 'attachment',
        },
      ],
    });
    return { response, message: 'success' };
  }
}
