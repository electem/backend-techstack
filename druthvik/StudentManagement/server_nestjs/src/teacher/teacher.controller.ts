/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherDto } from './teacher.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as fs from 'fs';
import hbs from 'handlebars';
import puppeteer from 'puppeteer';

@Controller('teacher')
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
    private mailService: MailerService,
  ) {}

  @Get()
  findAll() {
    return this.teacherService.findAllTeacher();
  }

  @Post()
  async create(@Body() teacherDto: TeacherDto) {
    return await this.teacherService.createTeacher(teacherDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findTeacherByID(+id);
  }

  @Put('/')
  async update(@Body() teacherDto: TeacherDto) {
    return await this.teacherService.updateTeacher(teacherDto);
  }
  @Post('pdf-email/:id')
  async postHTMLEmail(@Param('id') id: string) {
    const teacherbyid = await this.teacherService.findTeacherByID(+id);
    const compile = async function (templatename, data) {
      const html = fs.readFileSync(
        join(__dirname, '../../src/mails/teacher.hbs'),
        'utf-8',
      );
      return hbs.compile(html)(teacherbyid);
    };
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    const content = compile('teacher', teacherbyid);
    console.log(content);
    await page.setContent(await content);
    await page.pdf({
      format: 'A4',
      path: join(__dirname, '../../src/mails/teacher.pdf'),
    });
    const response = await this.mailService.sendMail({
      to: teacherbyid.email,
      from: 'druthvik@electems.com',
      subject: 'Teacher Information',
      attachments: [
        {
          path: join(__dirname, '../../src/mails/teacher.pdf'),
          filename: `${teacherbyid.name}.pdf`,
          contentDisposition: 'attachment',
        },
      ],
    });
    return response;
  }
}
