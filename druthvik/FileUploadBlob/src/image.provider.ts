/* eslint-disable prettier/prettier */
import { Image } from './images/image.entity';

export const ImageProviders = [
  {
    provide: 'Image_REPOSITORY',
    useValue: Image,
  },
];
