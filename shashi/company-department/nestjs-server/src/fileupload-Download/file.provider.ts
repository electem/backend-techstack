/* eslint-disable prettier/prettier */
import { Image } from '../fileupload-Download/file.entity';

export const ImageProviders = [
  {
    provide: 'Image_REPOSITORY',
    useValue: Image,
  },
];
