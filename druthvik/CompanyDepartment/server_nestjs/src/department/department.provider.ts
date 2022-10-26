import { Department } from './entity/department.entity';

export const DepartmentProviders = [
  {
    provide: 'DEPARTMENT_REPOSITORY',
    useValue: Department,
  },
];
