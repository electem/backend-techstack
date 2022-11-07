import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './student.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  findAll() {
    return this.studentService.findAllSchool();
  }
}
