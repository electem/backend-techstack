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
import { multerOptions } from './file.Multerservice';
import { FileToFolder } from './fileTofolder.entity';
@Controller('photosToFolder')
export class FileToFolderController {
  constructor(
    @InjectRepository(FileToFolder)
    private readonly imageRepository: Repository<FileToFolder>,
  ) {}

  // this block of code will upload image to a folder and database at a time

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(@UploadedFile() file) {
    try {
      await this.imageRepository.save(file);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return { message: 'uploaded successfully' };
  }

  // this block of code will download the image based on the filename

  @Get('/:originalname')
  @UseInterceptors()
  async download(@Res() res, @Param('originalname') originalname) {
    const imageDownloadFromDB = await this.imageRepository.findOneBy({
      originalname,
    });
    const filepath = './uploads/' + originalname;
    return res.download(filepath);
  }
}
