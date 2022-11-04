/* eslint-disable prettier/prettier */
import { Image } from '../fileupload-Download/file.entity';
import { FileToFolder } from './fileTofolder.entity';

export const ImageProviders = [
  {
    provide: 'photos',
    useValue: Image,
    useValue1: FileToFolder,
  },
];
