/* eslint-disable prettier/prettier */
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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './student.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Student } from './student.entity';

//@UseGuards(JwtAuthGuard)
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

  @Delete('/:id')
  public async deleteSchool(@Param('id') id: string): Promise<void> {
    const student = this.studentService.deleteStudent(+id);
    if (!student) {
      throw new NotFoundException('School does not exist!');
    }
    return student;
  }
}
