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

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
