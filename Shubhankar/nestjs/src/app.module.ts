/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { CustomerModule } from './customer/customer.module';
import { CustomergroupModule } from './customergroup/customergroup.module';
import { databaseProviders } from './database';
import { DatabaseModule } from './database.module';
import { DepartmentModule } from './department/department.module';
import { UnitModule } from './unit/unit.module';

@Module({
  imports: [CustomerModule, CustomergroupModule, DatabaseModule,UnitModule,CompanyModule,DepartmentModule],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
})
export class AppModule {}
