import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { studentProviders } from './student.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentService, ...studentProviders],
  controllers: [StudentController],
})
export class StudentModule {}
