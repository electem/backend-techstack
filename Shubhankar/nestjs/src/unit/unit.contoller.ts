/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common"
import { Unit } from "./unit.entity"
import { UnitService } from "./unit.service";

@Controller('unit')
export class UnitController {
    constructor(private readonly unitService: UnitService) {}

@Get()
getAllunit(): Promise<Unit[]> {
      return this.unitService.getAllUnit();
  }
}