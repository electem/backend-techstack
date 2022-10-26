import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Department } from '../entity/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    private departmentRepository: typeof Department,
  ) {}

  async createDepartment(department: Department): Promise<Department> {
    try {
      const createdepartment = new this.departmentRepository({
        id: department.id,
        name: department.name,
        type: department.type,
      });
      return await createdepartment.save();
    } catch (error) {
      throw new HttpException(
        'Error creating customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
