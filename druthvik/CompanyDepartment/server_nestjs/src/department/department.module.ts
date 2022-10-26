import { Module } from '@nestjs/common';
import { DepartmentController } from './controller/department.controller';
import { DepartmentService } from './service/department.service';
import { Department } from './entity/department.entity';
import { DepartmentProviders } from './department.provider';

@Module({
  imports: [Department],
  controllers: [DepartmentController],
  providers: [DepartmentService, ...DepartmentProviders],
})
export class DepartmentModule {}
