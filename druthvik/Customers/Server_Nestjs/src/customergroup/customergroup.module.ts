import { Module } from '@nestjs/common';
import { CustomerGroupController } from './controller/customergroup.controller';
import { CustomerGroupService } from './service/customergroup.service';
import { CustomerGroup } from './entity/customergroup.entity';
import { customerGroupProviders } from './customergroup.provider';

@Module({
  imports: [CustomerGroup],
  controllers: [CustomerGroupController],
  providers: [CustomerGroupService, ...customerGroupProviders],
})
export class CustomerGroupModule {}
