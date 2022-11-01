import { Module } from '@nestjs/common';
import { CustomerController } from './controller/customer.controller';
import { CustomerService } from './service/customer.service';
import { Customer } from './entity/customer.entity';
import { customerProviders } from './customer.provider';

@Module({
  imports: [Customer],
  controllers: [CustomerController],
  providers: [CustomerService, ...customerProviders],
})
export class CustomerModule {}
