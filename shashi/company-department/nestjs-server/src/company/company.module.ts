/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { Company } from './company.model';
import { CompanyService } from './company.service';
import { CompanyProviders } from './company.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), AuthModule],
  providers: [...CompanyProviders, CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
