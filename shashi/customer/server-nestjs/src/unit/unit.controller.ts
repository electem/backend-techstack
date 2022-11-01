/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Unit } from './unit.entity';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  async getunits(): Promise<Array<Unit>> {
    return this.unitService.getunits();
  }
}
