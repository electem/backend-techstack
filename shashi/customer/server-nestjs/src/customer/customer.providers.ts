/* eslint-disable prettier/prettier */
import { Customer } from './customer.entity';

export const CustomerProviders = [
  {
    provide: 'Customer',
    useValue: Customer,
  },
];
