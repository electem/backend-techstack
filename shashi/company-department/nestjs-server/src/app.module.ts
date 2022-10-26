/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './database.providers';
import { CompanyModule } from './company/company.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [CompanyModule, DepartmentModule],
  controllers: [AppController],
  providers: [...databaseProviders, AppService],
})
export class AppModule {}
