/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerProviders } from './customer.provider';
import { CustomerService } from './customer.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService, ...CustomerProviders],
})
export class CustomerModule {}




