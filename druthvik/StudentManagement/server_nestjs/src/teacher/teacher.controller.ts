/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherDto } from './teacher.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

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
}
