/* eslint-disable prettier/prettier */
import { Image } from './file.entity';

export const ImageProviders = [
  {
    provide: 'photos',
    useValue: Image,
  },
];
