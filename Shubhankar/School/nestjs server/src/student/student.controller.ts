/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { StudentService } from './student.service';


@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}


  @Post()
  async createTeacher(@Body() studentDto: StudentDto) {
    return await this.studentService.createStudent(studentDto);
  }
}