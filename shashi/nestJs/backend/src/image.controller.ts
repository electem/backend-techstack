/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Blob } from 'buffer';
//import * as Blob from "blob";
import { ImageFileDto } from './fileupload/fileupload.entity';
@Controller('photos')
export class FileController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async imageToBlob(@UploadedFile() file: Express.Multer.File) {
    //const Blob = require('blob');
    const encodeImage = new Blob([file.buffer], { type: file.mimetype });
    const image = await ImageFileDto.create({ filename: encodeImage });
    return { id: image.id, filename: image.filename };
  }
}
