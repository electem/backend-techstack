/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentProviders } from './department.providers';
import { DepartmentService } from './department.service';
import { Department } from './department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Department]), AuthModule],
  providers: [...DepartmentProviders, DepartmentService],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
