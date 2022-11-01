import { Module } from '@nestjs/common';
import { CompanyService } from '../company/company.service';
import { CompanyController } from '../company/company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../company/company.entity';
import { companyProviders } from '../company/company.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompanyService, ...companyProviders],
  controllers: [CompanyController],
})
export class CompanyModule {}
