/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { IdsDto } from './dto/ids.dto';
import { SchoolDto } from './dto/school.dto';
import { PageRequest } from './pageRequest.model';
import { Page } from './pagination.model';
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

  async getAllSchool(): Promise<School[]> {
    const schoolteacherstudent = await this.schoolRepository
      .createQueryBuilder('schools')
      .select(['schools', 'teachers'])
      .leftJoinAndSelect('schools.teachers', 'teachers')
      .leftJoinAndSelect('schools.students', 'students')
      .getMany();
    return schoolteacherstudent;
  }

  async schoolbyId(id: number): Promise<School> {
    const schoolteacherstudent = await this.schoolRepository
      .createQueryBuilder('schools')
      .select(['schools', 'teachers', 'students'])
      .leftJoinAndSelect('schools.teachers', 'teachers')
      .leftJoinAndSelect('schools.students', 'students')
      .where('schools.schoolid= :schoolId', { schoolId: id })
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

  public async getAllUsersByPage(
    pageRequest: PageRequest,
  ): Promise<Page<School>> {
    const result = await this.schoolRepository.findAndCount({
      where: { schoolname: ILike('%' + pageRequest.search + '%') },
      order: { schoolname: 'DESC' },
      skip: (pageRequest.page - 1) * pageRequest.size,
      take: pageRequest.size,
    });
    const data1 = result[0].filter((option) => {
      return option.schoolname.toLowerCase().match(pageRequest.search);
    });
    return Page.from(data1, result[1], pageRequest);
  }

  public async removeAllSchool(ids: IdsDto[]): Promise<void> {
    await this.schoolRepository
      .createQueryBuilder()
      .delete()
      .from('school')
      .where('school.schoolid IN (:...ids)', { ids: ids })
      .execute();
  }
}
