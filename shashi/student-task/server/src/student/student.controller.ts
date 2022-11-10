/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Student } from './student.entity';
import { StudentDto } from './student.dto';
import { StudentService } from './student.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('student')
export class StudentController {
  constructor(private readonly StudentService: StudentService) {}
  @Post()
  async createStudent(@Body() student: StudentDto) {
    return await this.StudentService.createStudent(student);
  }

  @Get()
  async findAllStudent(): Promise<Array<Student>> {
    return this.StudentService.findAllStudent();
  }
  @Get('/:id')
  async findOneSchool(@Param('id') id): Promise<Student> {
    return this.StudentService.findOneStudent(id);
  }
  @Put('/')
  async updateStudent(@Body() studentDto: StudentDto) {
    return await this.StudentService.updateStudent(studentDto);
  }
}
