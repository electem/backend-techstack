/* eslint-disable prettier/prettier */
import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getRepository, Repository } from 'typeorm';
import { School } from './school.entity';
import { SchoolDto } from './school.dto';
import { Page } from './pagination.model';
import { PageRequest } from './pageRequest.model';
import { DeleteSchool } from './schooldeleteEntity';
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
  async findOneSchool(schoolid: number) {
    const postWithQueryBuilder = await this.schoolRepository
      .createQueryBuilder('school')
      .select(['school', 'teacher'])
      .leftJoinAndSelect('school.teacher', 'teacher')
      .leftJoinAndSelect('school.students', 'students')
      .where('school.schoolid= :id', { id: schoolid })
      .getOne();
    return postWithQueryBuilder;
  }

  async getAllSchoolWithTeacher() {
    const getAll = await this.schoolRepository
      .createQueryBuilder('school')
      .select(['school', 'teacher'])
      .leftJoinAndSelect('school.teacher', 'teacher')
      .leftJoinAndSelect('school.students', 'students')
      .getMany();
    return getAll;
  }
  public async updateSchool(schoolDto: SchoolDto): Promise<School> {
    try {
      return await this.schoolRepository.save(schoolDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  public async deleteSchool(id: number): Promise<void> {
    const school = await this.findOneSchool(id);
    await this.schoolRepository.remove(school);
  }

  public async getAllSchoolsByPage(
    pageRequest: PageRequest,
  ): Promise<Page<School>> {
    const postWithQueryBuilder = await this.schoolRepository
      .createQueryBuilder('school')
      .where('school.schoolname like :seachedString', {
        seachedString: pageRequest.seachedString,
      })
      .getCount();
    // console.log(postWithQueryBuilder);
    const result = await this.schoolRepository.findAndCount({
      skip: (pageRequest.page - 1) * pageRequest.size,
      take: pageRequest.size,
    });
    if (pageRequest.seachedString == '') {
      return Page.from(result[0], result[1], pageRequest);
      //result[0] refers number of records in that page  //result[1] refers whole records of table
    } else {
      result[0] = result[0].filter((option) => {
        return option.schoolname.toLowerCase().match(pageRequest.seachedString);
      });
      return Page.from(result[0], result[1], pageRequest);
    }
  }

  public async deleteAllSchool(ids): Promise<void> {
    this.schoolRepository
      .createQueryBuilder()
      .delete()
      .from('school')
      .where('school.schoolid IN (:...ids)', { ids })
      .execute();
  }

  // public async findByUsername(
  //   schoolname: string,
  // ): Promise<School[] | undefined> {
  //   const postWithQueryBuilder = await this.schoolRepository
  //     .createQueryBuilder('school')
  //     .where('school.schoolname= :schoolname', { schoolname: schoolname })
  //     .getRawMany();
  //   return postWithQueryBuilder;
  // }
}
