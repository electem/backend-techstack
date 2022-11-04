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

  // this block of code will upload image/file  database

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file: Express.Multer.File) {
    try {
      this.imageRepository.save(file);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return 'uploaded successfully';
  }

  @Get('/:originalname')
  @UseInterceptors()
  async download(@Res() res, @Param('originalname') originalname) {
    const imageDownloadFromDB = await this.imageRepository.findOneBy({
      originalname,
    });
    const stream = Readable.from(imageDownloadFromDB.buffer);
    return stream.pipe(res);
  }
}
