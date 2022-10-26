import { Module } from '@nestjs/common';
import { DepartmentController } from './controller/department.controller';
import { DepartmentService } from './service/department.service';
import { Department } from './entity/department.entity';
import { departmentProviders } from './department.provider';

@Module({
  imports: [Department],
  controllers: [DepartmentController],
  providers: [DepartmentService, ...departmentProviders],
})
export class DepartmentModule {}
