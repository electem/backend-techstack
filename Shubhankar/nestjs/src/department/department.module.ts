/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DepartmentController} from './department.controller';
import { DepartmentProviders} from './department.provider';
import { DepartmentService} from './department.service';

@Module({
  imports: [],
  controllers: [DepartmentController],
  providers: [DepartmentService, ...DepartmentProviders],
})
export class DepartmentModule {}
