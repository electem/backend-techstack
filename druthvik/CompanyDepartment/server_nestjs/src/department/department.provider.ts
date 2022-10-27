import { Department } from './department.entity';

export const departmentProviders = [
  {
    provide: 'DRPARTMENT_REPOSITORY',
    useValue: Department,
  },
];
