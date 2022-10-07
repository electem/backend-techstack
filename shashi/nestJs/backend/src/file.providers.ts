/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ImageFileDto } from './fileupload/fileupload.entity';

export const filesProviders = [
  {
    provide: 'CATS_REPOSITORY',
    useValue: ImageFileDto,
  },
];
