import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { companyProviders } from './company.provider';

@Module({
  imports: [Company],
  controllers: [CompanyController],
  providers: [CompanyService, ...companyProviders],
})
export class CompanyModule {}
