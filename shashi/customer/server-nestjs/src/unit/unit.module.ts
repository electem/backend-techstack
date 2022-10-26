/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';
import { UnitProviders } from './unit.provider';
import { Unit } from './unit.entity';

@Module({
  imports: [Unit],
  providers: [...UnitProviders, UnitService],
  controllers: [UnitController],
})
export class UnitModule {}
