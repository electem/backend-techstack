/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherDto } from './dto/teacher.dto';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async getAllTeachers(): Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }

  public async createTeacher(teacherDto: TeacherDto): Promise<Teacher> {
    try {
      return await this.teacherRepository.save(teacherDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async teacherbyId(id: number): Promise<Teacher> {
    return this.teacherRepository.findOneBy({ id });
  }

  public async updateTeacher(teacherDto: TeacherDto): Promise<Teacher> {
    try {
      return await this.teacherRepository.save(teacherDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

}
