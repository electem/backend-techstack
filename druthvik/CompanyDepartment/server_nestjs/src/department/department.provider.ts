import { Department } from './entity/department.entity';

export const departmentProviders = [
  {
    provide: 'DEPARTMENT_REPOSITORY',
    useValue: Department,
  },
];
