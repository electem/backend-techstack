/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
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
import { Blob } from 'buffer';
import type { Express, Response } from 'express';

import { Image } from './fileupload/fileupload.entity';
@Controller('photos')
export class FileController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async imageToBlob(@UploadedFile() file: Express.Multer.File) {
    const encodeImage = new Blob([file.buffer], { type: file.mimetype });
    const image = await Image.create({ filename: encodeImage });
    return { id: image.id, filename: image.filename };
  }

  @Get('/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async loadFile(
    @Param('id') id,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Image> {
    const file = await Image.findByPk(id);
    const imageData = new Image();
    (imageData.id = file.id),
      (imageData.filename = file.filename),
      (imageData.originalname = file.originalname),
      res.set({
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename=' + imageData.filename,
      });
    console.log(imageData);
    return imageData;
  }
}
