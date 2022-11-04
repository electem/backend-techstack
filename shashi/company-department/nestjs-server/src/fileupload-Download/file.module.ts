/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { Image } from '../fileupload-Download/file.entity';
import { ImageProviders } from './file.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageService } from './file.service';
import { ConfigService } from '@nestjs/config';
import { FileToFolderController } from './fileUpload-dwnld-fldr-db.controller';
import { FileToFolder } from './fileTofolder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, FileToFolder])],
  providers: [...ImageProviders, ImageService, ConfigService],
  controllers: [FileController, FileToFolderController],
})
export class ImageModule {}
