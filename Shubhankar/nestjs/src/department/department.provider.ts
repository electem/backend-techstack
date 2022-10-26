/* eslint-disable prettier/prettier */
import { Department } from './department.entity'

export const DepartmentProviders = [
  { provide: 'DepartmentRepository', useValue: Department },
];
