import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './school.entity';
import { SchoolDto } from './school.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}
  public async createSchool(schoolDto: SchoolDto): Promise<School> {
    try {
      return await this.schoolRepository.save(schoolDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAllSchool(): Promise<School[]> {
    return await this.schoolRepository.find();
  }

  async findSchoolByID(id: number) {
    const postWithQueryBuilder = await this.schoolRepository
      .createQueryBuilder('school')
      .select(['school', 'teacher', 'student'])
      .leftJoinAndSelect('school.teacher', 'teacher')
      .leftJoinAndSelect('school.student', 'student')
      .where('school.id= :id', { id: id })
      .getOne();
    return postWithQueryBuilder;
  }
  async getAllSchool() {
    const getAll = await this.schoolRepository
      .createQueryBuilder('school')
      .select(['school', 'teacher', 'student'])
      .leftJoinAndSelect('school.teacher', 'teacher')
      .leftJoinAndSelect('school.student', 'student')
      .getMany();
    return getAll;
  }
}
