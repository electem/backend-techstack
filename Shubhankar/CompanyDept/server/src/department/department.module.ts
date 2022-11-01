/* eslint-disable prettier/prettier */
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';

import { Module } from '@nestjs/common';
import { departmentProviders } from './department.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  providers: [DepartmentService,],
  controllers: [DepartmentController],
})
export class DepartmentModule {}

