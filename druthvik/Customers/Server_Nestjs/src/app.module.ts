/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './database.provider';
import { DatabaseModule } from './database.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerGroupModule } from './customergroup/customergroup.module';
import { UnitModule } from './unit/unit.module';

@Module({
  imports: [DatabaseModule, CustomerModule, CustomerGroupModule, UnitModule],
  controllers: [AppController],
  providers: [...databaseProviders, AppService],
})
export class AppModule {}
