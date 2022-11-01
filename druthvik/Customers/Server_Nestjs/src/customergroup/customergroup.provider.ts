import { CustomerGroup } from './entity/customergroup.entity';

export const customerGroupProviders = [
  {
    provide: 'CUSTOMERS_GROUP_REPOSITORY',
    useValue: CustomerGroup,
  },
];
