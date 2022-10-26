import { Module } from '@nestjs/common';
import { CompanyController } from './controller/company.controller';
import { CompanyService } from './service/company.service';
import { Company } from './entity/company.entity';
import { companyProviders } from './company.provider';

@Module({
  imports: [Company],
  controllers: [CompanyController],
  providers: [CompanyService, ...companyProviders],
})
export class CompanyModule {}
