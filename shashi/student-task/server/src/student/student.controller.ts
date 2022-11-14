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
import { Student } from './student.entity';
import { StudentDto } from './student.dto';
import { StudentService } from './student.service';
import { AuthGuard } from '@nestjs/passport';

import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as fs from 'fs';
import hbs from 'handlebars';
import puppeteer from 'puppeteer';

@UseGuards(AuthGuard())
@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private mailService: MailerService,
  ) {}
  @Post()
  async createStudent(@Body() student: StudentDto) {
    const studentmail = await this.studentService.createStudent(student);
    const compile = async function (templatename, data) {
      const html = fs.readFileSync(
        join(__dirname, '../../src/mailsfolder/student.hbs'),
        'utf-8',
      );
      return hbs.compile(html)(studentmail);
    };
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    const content = compile('student', studentmail);
    await page.setContent(await content);
    await page.pdf({
      format: 'A4',
      path: join(__dirname, '../../src/mailsfolder/student.pdf'),
    });
    const response = await this.mailService.sendMail({
      // to: studentmail.email,
      // from: 'shashi@electems.com',
      // subject: 'send mail with attachment',
      // attachments: [
      //   {
      //     path: join(__dirname, '../../src/mailsfolder/student.pdf'),
      //     filename: 'electems.pdf',
      //     contentDisposition: 'attachment',
      //   },
      // ],
    });
    return { response, message: 'success' };
  }

  @Get()
  async findAllStudent(): Promise<Array<Student>> {
    return this.studentService.findAllStudent();
  }
  @Get('/:id')
  async findOneStudent(@Param('id') id): Promise<Student> {
    return this.studentService.findOneStudent(id);
  }
  @Put('/')
  async updateStudent(@Body() studentDto: StudentDto) {
    return await this.studentService.updateStudent(studentDto);
  }
  @Delete('/:id')
  public async deleteSchool(@Param('id') id: string): Promise<void> {
    const student = this.studentService.deleteStudent(+id);
    if (!student) {
      throw new NotFoundException('student does not exist!');
    }
    return student;
  }
}
