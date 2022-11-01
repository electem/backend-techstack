/* eslint-disable prettier/prettier */
import { Company } from '../company/company.entity';
export const companyProviders = [
  {
    provide: 'COMPANY_REPOSITORY',
    useValue: Company,
  },
];