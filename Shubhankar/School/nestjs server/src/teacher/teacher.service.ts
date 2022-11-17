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
    const teacherschool = await this.teacherRepository
      .createQueryBuilder('teachers')
      .select(['teachers', 'schools'])
      .leftJoinAndSelect('teachers.schools', 'schools')
      .getMany();
    return teacherschool;
  }

  public async createTeacher(teacherDto: TeacherDto): Promise<Teacher> {
    try {
      return await this.teacherRepository.save(teacherDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async teacherbyId(id: number): Promise<Teacher> {
    const teacherschool = await this.teacherRepository
      .createQueryBuilder('teachers')
      .select(['teachers', 'schools'])
      .leftJoinAndSelect('teachers.schools', 'schools')
      .where('teachers.teacherid= :teachersid', { teachersid: id })
      .getOne();
    return teacherschool;
  }

  public async updateTeacher(teacherDto: TeacherDto): Promise<Teacher> {
    try {
      return await this.teacherRepository.save(teacherDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async removeTeacher(id: number): Promise<void> {
    const school = await this.teacherbyId(id);
    await this.teacherRepository.remove(school);
  }
}
