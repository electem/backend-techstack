/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { DepartmentDto } from './department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  public async findAllDepartment(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  public async createDepartment(
    departmentDto: DepartmentDto,
  ): Promise<Department> {
    try {
      return await this.departmentRepository.save(departmentDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  //code with out query builder

  // async findOneDepartment(id: number) {
  //   const postWithRepository = await this.departmentRepository.findOneBy({
  //     id,
  //   });
  //   return postWithRepository;
  // }

  async findOneDepartment(id: number) {
    const postWithQueryBuilder = await this.departmentRepository
      .createQueryBuilder('department')
      .select(['department', 'company'])
      .leftJoinAndSelect('department.company', 'company')
      .where('department.id= :id', { id: id })
      .getOne();
    return postWithQueryBuilder;
  }
}
