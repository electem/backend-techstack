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
import { TeacherDto } from './teacher.dto';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
  @Post()
  async createTeacher(@Body() teacher: TeacherDto) {
    return await this.teacherService.createTeacher(teacher);
  }

  @Get()
  async findAllTeacher(): Promise<Array<Teacher>> {
    return this.teacherService.findAllTeacher();
  }
  @Get('/:id')
  async findOneTeacheer(@Param('id') id): Promise<Teacher> {
    return this.teacherService.findOneTeacheer(id);
  }
}