/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Unit } from './unit.entity';

@Injectable()
export class UnitService {
  constructor(
    @Inject('Unit')
    private unitModel: typeof Unit,
  ) {}

  async getunits(): Promise<Array<Unit>> {
    return this.unitModel.findAll();
  }
}
