/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CustomerProviders } from './customer.providers';

@Module({
  imports: [Customer],
  providers: [...CustomerProviders, CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
