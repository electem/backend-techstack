import { Unit } from './entity/unit.entity';

export const unitProviders = [
  {
    provide: 'UNIT_REPOSITORY',
    useValue: Unit,
  },
];
