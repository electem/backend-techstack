/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CompanyController} from './company.controller'
import { CompanyProviders} from './company.provider'
import { CompanyService } from './company.service';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [CompanyService, ...CompanyProviders],
})
export class CompanyModule {}
