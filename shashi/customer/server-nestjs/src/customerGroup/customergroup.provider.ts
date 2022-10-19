/* eslint-disable prettier/prettier */
import { CustomerGroup } from './customergroup.entity';

export const CustomergroupProviders = [
  {
    provide: 'Customergroup',
    useValue: CustomerGroup,
  },
];
