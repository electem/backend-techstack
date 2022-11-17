/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentDto } from './dto/student.dto';
import { Student } from './student.entity';
import { StudentService } from './student.service';

//@UseGuards(AuthGuard('jwt'))
@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}


  @Post()
  async createTeacher(@Body() studentDto: StudentDto) {
    return await this.studentService.createStudent(studentDto);
  }

  @Get()
  async allStudents(): Promise<Array<Student>> {
    return await this.studentService.getAllStudents();
  }

  @Get(':studentid')
  schoolbyId(@Param('studentid') id: string) {
    return this.studentService.studentbyId(+id);
  }

  @Put('/')
  async updateStudent(@Body() studentDto: StudentDto) {
    return await this.studentService.updateStudent(studentDto);
  }

  @Delete('/:studentid')
  public async deleteStudent(@Param('studentid') id: string): Promise<void> {
    const school = this.studentService.removeStudent(+id);
    if (!school) {
      throw new NotFoundException('school not exist');
    }
    return school;
  }
}