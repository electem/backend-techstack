/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { DepartmentDto } from './dto/depertment.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}
  public async getAllDepartments(): Promise<Department[]> {
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
  async findDepartmentById(id: number) {
    const departmentQueryBuilder = await this.departmentRepository
      .createQueryBuilder('department')
      .select(['department', 'company'])
      .leftJoinAndSelect('department.company', 'company')
      .where('department.id= :id', { id: id })
      .getOne();
    return departmentQueryBuilder;
  }

  public async updateDepartment(
    departmentDto: DepartmentDto,
  ): Promise<Department> {
    try {
      return await this.departmentRepository.save(departmentDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
