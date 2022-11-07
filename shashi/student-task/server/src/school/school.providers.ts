/* eslint-disable prettier/prettier */
import { School } from './school.entity';

export const SchoolProviders = [
  {
    provide: 'school',
    useValue: School,
  },
];
