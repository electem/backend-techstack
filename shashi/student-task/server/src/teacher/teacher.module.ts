/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { Teacher } from './teacher.entity';
import { TeacherDto } from './teacher.dto';
import { TeacherService } from './teacher.service';
import { TeacherProviders } from './teacher.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), AuthModule],
  providers: [...TeacherProviders, TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule {}
