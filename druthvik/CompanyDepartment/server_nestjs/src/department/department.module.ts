import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { departmentProviders } from './department.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  providers: [DepartmentService, ...departmentProviders],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
