/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherDto } from './teacher.dto';
import { join } from 'path';
import * as fs from 'fs';
import hbs from 'handlebars';
import puppeteer from 'puppeteer';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
      from: 'druthvik@electems.com',
      subject: 'Teacher Information',
      attachments: [
        {
          path: join(__dirname, '../../src/mails/teacher.pdf'),
          filename: `${teacher.name}.pdf`,
          contentDisposition: 'attachment',
        },
      ],
    });
    return teacher;
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findTeacherByID(+id);
  }

  @Put('/')
  async update(@Body() teacherDto: TeacherDto) {
    return await this.teacherService.updateTeacher(teacherDto);
  }

  @Delete('/:id')
  public async deleteTeacher(@Param('id') id: string): Promise<void> {
    const teacher = this.teacherService.deleteTeacher(+id);
    if (!teacher) {
      throw new NotFoundException('School does not exist!');
    }
    return teacher;
  }
}
