/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UnitController } from './unit.contoller';
import { UnitProviders } from './unit.provider';
import { UnitService } from './unit.service';

@Module({
  imports: [],
  controllers: [UnitController],
  providers: [UnitService, ...UnitProviders],
})
export class UnitModule {}
