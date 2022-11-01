/* eslint-disable prettier/prettier */
import { Company } from './company.entity'

export const CompanyProviders = [
  { provide: 'CompanyRepository', useValue: Company },
];
