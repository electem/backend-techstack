/* eslint-disable prettier/prettier */
import { Department } from './department.entity';
import { Inject, Injectable } from '@nestjs/common';
import { DepertmentDto } from './dto/depertment.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DepartmentRepository')
    private readonly DepartmentRepository: typeof Department,
  ) {}

  async createDepartment(id: number, departments: DepertmentDto) {
    const department = new Department();
    department.id = id;
    department.name = departments.name;
    department.type = departments.type;
    return department.save();
  }

  async getAllDepertment() {
    const department = await this.DepartmentRepository.findAll<Department>();
    return department;
  }
}
