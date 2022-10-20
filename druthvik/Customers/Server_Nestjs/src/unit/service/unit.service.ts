import { Injectable, Inject } from '@nestjs/common';
import { Unit } from '../entity/unit.entity';

@Injectable()
export class UnitService {
  constructor(
    @Inject('UNIT_REPOSITORY')
    private unitRepository: typeof Unit,
  ) {}

  async getUnit(): Promise<Unit[]> {
    return this.unitRepository.findAll<Unit>();
  }
}
