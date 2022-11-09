/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { TeacherDto } from './teacher.dto';
@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  public async createTeacher(teacherDto: TeacherDto): Promise<Teacher> {
    try {
      return await this.teacherRepository.save(teacherDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  public async findAllTeacher(): Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }
}
