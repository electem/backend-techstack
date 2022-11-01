/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { Image } from '../fileupload-Download/file.entity';
import { ImageProviders } from './file.provider';
//import { FileSaverService } from './file.service';

@Module({
  imports: [Image],
  providers: [...ImageProviders],
  controllers: [FileController],
})
export class ImageModule {}
