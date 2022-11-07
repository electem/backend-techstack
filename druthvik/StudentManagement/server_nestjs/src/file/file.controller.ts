/* eslint-disable @typescript-eslint/no-empty-function */
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
import { multerOptions } from './file.service';
import { File } from './file.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Express } from 'express';
import { Readable } from 'stream';
import { createReadStream } from 'fs';
@Controller('file')
export class FileController {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    await this.fileRepository.save(file);
    console.log(file);
    return 'file uploaded successfully';
  }

  @Get('/:originalname')
  @UseInterceptors()
  async download(@Res() res, @Param('originalname') originalname) {
    const imageDownloadFromDB = await this.fileRepository.findOneBy({
      originalname,
    });
    const stream = Readable.from(imageDownloadFromDB.buffer);
    return stream.pipe(res);
  }
}
