/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { Image } from '../fileupload-Download/file.entity';
import { ImageProviders } from './file.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageService } from './file.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [...ImageProviders, ImageService, ConfigService],
  controllers: [FileController],
})
export class ImageModule {}
