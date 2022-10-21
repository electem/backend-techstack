/* eslint-disable prettier/prettier */
import { Customergroup } from './customergroup.entity';

export const CustomergroupProviders = [
  { provide: 'CustomergroupRepository', useValue: Customergroup },
];
