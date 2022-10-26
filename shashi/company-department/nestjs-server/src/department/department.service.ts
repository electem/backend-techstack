/* eslint-disable prettier/prettier */
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Department } from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('department')
    private departmentModel: typeof Department,
  ) {}

  async createDepartment(department: Department): Promise<Department> {
    try {
      const createdDepartment = new this.departmentModel({
        departmentname: department.departmentname,
        type: department.type,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      });
      return await createdDepartment.save();
    } catch (error) {
      throw new HttpException('Error creating company', HttpStatus.BAD_REQUEST);
    }
  }
}
