import { Controller, Get } from '@nestjs/common';
import { UnitService } from '../service/unit.service';
import { Unit } from '../entity/unit.entity';
@Controller('units')
export class UnitController {
  constructor(private unitService: UnitService) {}

  @Get()
  async getCustomerGroup(): Promise<Unit[]> {
    return this.unitService.getUnit();
  }
}
