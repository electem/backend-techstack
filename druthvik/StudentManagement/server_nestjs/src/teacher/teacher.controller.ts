import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherDto } from './teacher.dto';

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
}
