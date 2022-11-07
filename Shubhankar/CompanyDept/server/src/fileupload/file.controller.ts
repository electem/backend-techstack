/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './file.entity';
import { Readable } from 'stream';

@Controller('photos')
export class FileController {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createImage(@UploadedFile() file: Express.Multer.File) {
    try {
      this.imageRepository.save(file);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return 'uploaded successfully';
  }

  @Get('/:originalname')
  @UseInterceptors()
  async downloadImage(@Res() res, @Param('originalname') originalname) {
    const imageDownloadFromDB = await this.imageRepository.findOneBy({
      originalname,
    });
    const stream = Readable.from(imageDownloadFromDB.buffer);
    res.set({
      'Content-Type': 'image/pdf',
    });
    return stream.pipe(res);
  }
}
