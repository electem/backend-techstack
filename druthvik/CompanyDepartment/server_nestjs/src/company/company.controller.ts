/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './company.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as fs from 'fs';
import hbs from 'handlebars';
import puppeteer from 'puppeteer';
import { Page } from 'src/pagination/page.model';
import { Company } from './company.entity';
import { PageRequest } from 'src/pagination/page.request.model';
import { CompanyDelete } from './companydelete.enitiy';

@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(
    private companyService: CompanyService,
    private mailService: MailerService,
  ) {}
  @Get('company')
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
  @Post('pdf-email/:id')
  async postHTMLEmail(@Param('id') id: string) {
    const companybyid = await this.companyService.findCompanyWithDepartmentById(
      +id,
    );
    const compile = async function (templatename, data) {
      const html = fs.readFileSync(
        join(__dirname, '../../src/mails/company.hbs'),
        'utf-8',
      );
      return hbs.compile(html)(companybyid);
    };
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    const content = compile('company', companybyid);
    console.log(content);
    await page.setContent(await content);
    await page.pdf({
      format: 'A4',
      path: join(__dirname, '../../src/mails/company.pdf'),
    });
    const response = await this.mailService.sendMail({
      to: companybyid.email,
      from: 'druthvik@electems.com',
      subject: 'send mail with attachment',
      attachments: [
        {
          path: join(__dirname, '../../src/mails/company.pdf'),
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
  @Get()
  public async getAllCompanyByPage(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('seachedString') seachedString: string,
  ): Promise<Page<Company>> {
    try {
      const pageRequest: PageRequest = PageRequest.from(
        page,
        size,
        seachedString,
      );
      return this.companyService.getAllCompanyByPage(pageRequest);
    } catch (error) {}
  }
  @Delete('delete')
  public async deleteAll(@Body() body): Promise<void> {
    let data: CompanyDelete[] = [];
    data = body.ids;
    this.companyService.deleteCompanyByIds(data);
    console.log(data);
  }
}
