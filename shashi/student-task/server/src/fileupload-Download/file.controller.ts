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
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './file.service';

@Controller('photos')
export class FileController {
  constructor(private ImageService: ImageService) {}

  // this block of code will upload image/file  database

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.ImageService.uploadFile(file);
  }

  @Get('/:originalname')
  @UseInterceptors()
  async download(@Res() res, @Param('originalname') originalname) {
    return this.ImageService.download(res, originalname);
  }
}
