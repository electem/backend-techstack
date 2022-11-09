/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentProviders } from './student.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), AuthModule],
  providers: [...StudentProviders, StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
