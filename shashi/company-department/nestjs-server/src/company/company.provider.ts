/* eslint-disable prettier/prettier */
import { Company } from './company.model';

export const CompanyProviders = [
  {
    provide: 'company',
    useValue: Company,
  },
];
