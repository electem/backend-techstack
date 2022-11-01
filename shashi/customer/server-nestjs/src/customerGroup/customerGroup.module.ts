/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CustomerGroupController } from './customergroup.controller';
import { CustomerGroupService } from './customergroup.service';
import { CustomerGroup } from './customergroup.entity';
import { CustomergroupProviders } from './customergroup.provider';

@Module({
  imports: [CustomerGroup],
  providers: [...CustomergroupProviders, CustomerGroupService],
  controllers: [CustomerGroupController],
})
export class CustomerGroupModule {}
