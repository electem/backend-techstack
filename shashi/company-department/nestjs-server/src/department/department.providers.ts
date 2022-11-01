/* eslint-disable prettier/prettier */
import { Department } from './department.entity';

export const DepartmentProviders = [
  {
    provide: 'department',
    useValue: Department,
  },
];
