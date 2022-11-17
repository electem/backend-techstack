/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolDto } from './dto/school.dto';
import { School } from './school.entity';


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

  async getAllSchool() : Promise<School[]> {
    const schoolteacherstudent =  await this.schoolRepository
    .createQueryBuilder('schools')
      .select(['schools', 'teachers'])
      .leftJoinAndSelect('schools.teachers', 'teachers')
      .leftJoinAndSelect('schools.students', 'students')
      .getMany();
    return schoolteacherstudent;
  }

  async schoolbyId(id: number): Promise<School> {
    const schoolteacherstudent =  await this.schoolRepository
    .createQueryBuilder('schools')
    .select(['schools', 'teachers', 'students'])
    .leftJoinAndSelect('schools.teachers', 'teachers')
    .leftJoinAndSelect('schools.students', 'students')
    .where("schools.schoolid= :schoolId", { schoolId: id })
    .getOne();
  return schoolteacherstudent;
}

  public async updateSchool(schoolDto: SchoolDto): Promise<School> {
    try {
      return await this.schoolRepository.save(schoolDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async removeSchool(id: number): Promise<void> {
    const school = await this.schoolbyId(id);
    await this.schoolRepository.remove(school);
  }
}