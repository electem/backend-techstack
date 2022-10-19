/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { CustomergroupModule } from './customergroup/customergroup.module';
import { databaseProviders } from './database';
import { DatabaseModule } from './database.module';

@Module({
  imports: [CustomerModule, CustomergroupModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
})
export class AppModule {}
