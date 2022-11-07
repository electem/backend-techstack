import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { teacherProviders } from './teacher.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  providers: [TeacherService, ...teacherProviders],
  controllers: [TeacherController],
})
export class TeacherModule {}
