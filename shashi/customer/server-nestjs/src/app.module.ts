/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './database.providers';
import { DatabaseModule } from './database.module';
import { CustomerModule } from './customer/customer.Module';
import { CustomerGroupModule } from './customerGroup/customerGroup.module';
import { UnitModule } from './unit/unit.module';

@Module({
  imports: [DatabaseModule, CustomerModule, CustomerGroupModule, UnitModule],
  controllers: [AppController],
  providers: [...databaseProviders, AppService],
})
export class AppModule {}
