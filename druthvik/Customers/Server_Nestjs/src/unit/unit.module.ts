import { Module } from '@nestjs/common';
import { UnitController } from './controller/unit.controller';
import { UnitService } from './service/unit.service';
import { Unit } from './entity/unit.entity';
import { unitProviders } from './unit.provider';

@Module({
  imports: [Unit],
  controllers: [UnitController],
  providers: [UnitService, ...unitProviders],
})
export class UnitModule {}
