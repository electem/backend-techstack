/* eslint-disable prettier/prettier */
import { Department } from './department.entity';

export const departmentProviders = [
  { provide: 'DepartmentRepository', useValue: Department },
  {
    provide: 'DRPARTMENT_REPOSITORY',
    useValue: Department,
  },
];
