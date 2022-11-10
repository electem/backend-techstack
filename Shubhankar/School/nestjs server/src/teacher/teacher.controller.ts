/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get()
  async allTeachers(): Promise<Array<Teacher>> {
    return await this.teacherService.getAllTeachers();
  }
}
