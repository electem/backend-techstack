/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';
import * as fs from 'fs';
import { join } from 'path';
import hbs from 'handlebars';
import puppeteer from 'puppeteer';

// @UseGuards(AuthGuard('jwt'))
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService,
    private mailService:MailerService) {}

  @Get('email/:id')
  async plainTextEmail(@Param('id') id: number){
     var company = await this.companyService.getCompanyById(+id,);

    var response =   await this.mailService.sendMail({
      to: company.email,
      from:'shubhankar@electems.com',
      subject:'Simple Plain Text',
      text:'welcome to nestjs' +  company.name,
    })
       return response 
  }  
  
  @Post('pdf-email/:id')
  async postHTMLEmail(@Param('id') id: string) {
    const companybyid = await this.companyService.getCompanyById(
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
      from: 'shubhankar@electems.com',
      subject: 'send email with attachment',
      attachments: [
        {
          path: join(__dirname, '../../src/mails/company.pdf'),
          filename: 'document.pdf',
          contentDisposition: 'attachment',
        },
      ],
    });
    return response;
  }

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
