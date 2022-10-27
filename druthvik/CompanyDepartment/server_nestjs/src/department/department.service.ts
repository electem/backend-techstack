import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentDto } from './department.dto';
import { Department } from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}
  public async findAllDepartments(): Promise<Department[]> {
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
  async findDepartmentWithCompanyById(id: number) {
    const idWithQueryBuilder = await this.departmentRepository
      .createQueryBuilder('department')
      .select(['department', 'company'])
      .leftJoinAndSelect('department.company', 'company')
      .where('department.id= :id', { id: id })
      .getOne();
    return idWithQueryBuilder;
  }
}
