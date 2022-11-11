/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get(':id')
  schoolbyId(@Param('id') id: string) {
    return this.teacherService.teacherbyId(+id);
  }

  @Put('/')
  async updateSchool(@Body() teacherDto: TeacherDto) {
    return await this.teacherService.updateTeacher(teacherDto);
  }
}
