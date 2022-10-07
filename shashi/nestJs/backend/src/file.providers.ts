/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Image } from './fileupload/fileupload.entity';

export const filesProviders = [
  {
    provide: 'CATS_REPOSITORY',
    useValue: Image,
  },
];
