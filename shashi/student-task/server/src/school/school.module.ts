/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { School } from './school.entity';
import { SchoolDto } from './school.dto';
import { SchoolService } from './school.service';
import { SchoolProviders } from './school.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([School]), AuthModule],
  providers: [...SchoolProviders, SchoolService],
  controllers: [SchoolController],
})
export class SchoolModule {}
