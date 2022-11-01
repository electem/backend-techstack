/* eslint-disable prettier/prettier */
import { Unit } from "./unit.entity";

export const UnitProviders = [
  { provide: 'unitRepository', useValue: Unit },
];
