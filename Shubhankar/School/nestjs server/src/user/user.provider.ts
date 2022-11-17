/* eslint-disable prettier/prettier */

import { UserEntity } from './user.entity';

export const userProviders = [
  {
    provide: 'User_REPOSITORY',
    useValue: UserEntity,
  },
];
