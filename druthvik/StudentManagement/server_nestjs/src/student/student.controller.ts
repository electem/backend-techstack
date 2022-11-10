import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './student.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  findAll() {
    return this.studentService.findAllSchool();
  }

  @Post()
  async create(@Body() studentDto: StudentDto) {
    return await this.studentService.createStudent(studentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findStudentByID(+id);
  }

  @Put('/')
  async update(@Body() studentDto: StudentDto) {
    return await this.studentService.updateStudent(studentDto);
  }
}
