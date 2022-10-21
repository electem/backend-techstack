/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { Unit } from "./unit.entity";



@Injectable()
export class UnitService {
  constructor(
    @Inject('unitRepository')
    private readonly unitRepository: typeof Unit,
  ) {}


async getAllUnit() {
    const customers = await this.unitRepository.findAll<Unit>();
    return customers;
  }
}