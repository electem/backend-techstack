import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get()
  findAll() {
    return this.teacherService.findAllTeacher();
  }
}
