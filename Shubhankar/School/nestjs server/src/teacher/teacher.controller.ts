/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeacherDto } from './dto/teacher.dto';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get()
  async allTeachers(): Promise<Array<Teacher>> {
    return await this.teacherService.getAllTeachers();
  }

  @Post()
  async createTeacher(@Body() teacherDto: TeacherDto) {
    return await this.teacherService.createTeacher(teacherDto);
  }
}
