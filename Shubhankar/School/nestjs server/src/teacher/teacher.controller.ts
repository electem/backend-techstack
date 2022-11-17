/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TeacherDto } from './dto/teacher.dto';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';
import * as fs from 'fs';
import { join } from 'path';
import hbs from 'handlebars';
import puppeteer from 'puppeteer';
import { MailerService } from '@nestjs-modules/mailer';


//@UseGuards(AuthGuard('jwt'))
@Controller('teacher')
export class TeacherController {

  constructor(private teacherService: TeacherService, private mailService:MailerService) {}

  @Post('pdfemail/:id')
    async postHTMLEmailId(@Param('id') id: string) {
      const teacherbyid = await this.teacherService.teacherbyId(
        +id,
      );
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
        path: join(__dirname, '../../src/mails/teachers.pdf'),
      });
      const response = await this.mailService.sendMail({
        to: teacherbyid.email,
        from: 'shubhankar@electems.com',
        subject: 'send email with attachment',
        attachments: [
          {
            path: join(__dirname, '../../src/mails/teachers.pdf'),
            filename: 'document.pdf',
            contentDisposition: 'attachment',
          },
        ],
      });
      return response;
    }


  @Get()
  async allTeachers(): Promise<Array<Teacher>> {
    return await this.teacherService.getAllTeachers();
  }

  @Post()
  async createTeacher(@Body() teacherDto: TeacherDto) {
    const teacher = await this.teacherService.createTeacher(teacherDto);
    const compile = async function (templatename, data) {
      const html = fs.readFileSync(
        join(__dirname, '../../src/mails/teacher.hbs'),
        'utf-8',
      );
      return hbs.compile(html)(data);
    };
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    const content = compile('teacher', teacher);
    console.log(content);
    await page.setContent(await content);
    await page.pdf({
      format: 'A4',
      path: join(__dirname, '../../src/mails/teacher.pdf'),
    });
    const response = await this.mailService.sendMail({
      to: teacher.email,
      from: 'shubhankar@electems.com',
      subject: 'new join Teacher',
      attachments: [
        {
          path: join(__dirname, '../../src/mails/teacher.pdf'),
          filename: `${teacher.teachername}.pdf`,
          contentDisposition: 'attachment',
        },
      ],
    });
    return teacher;
  }

  @Get(':teacherid')
  TeacherbyId(@Param('teacherid') id: string) {
    return this.teacherService.teacherbyId(+id);
  }

  @Put('/')
  async updateSchool(@Body() teacherDto: TeacherDto) {
    return await this.teacherService.updateTeacher(teacherDto);
  }

  @Delete('/:teacherid')
  public async deleteTeacher(@Param('teacherid') id: string): Promise<void> {
    const school = this.teacherService.removeTeacher(+id);
    if (!school) {
      throw new NotFoundException('school not exist');
    }
    return school;
  }
}
