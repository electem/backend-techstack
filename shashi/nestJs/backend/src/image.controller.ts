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
const fs = require('fs');
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
  ) {
    const file = await Image.findByPk(id);
    const imageData = new Image();
    (imageData.id = file.id),
      (imageData.filename = file.filename),
      (imageData.originalname = file.originalname),
      res.set({
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename=' + imageData.filename,
      });
    const size = new Blob([imageData.filename]).size;
    console.log(size);
    //console.log(imageData.filename.size);
    return imageData;
  }

  // @Get('/:id')
  // @UseInterceptors(FileInterceptor('file'))
  // public async loadFile(
  //   @Param('id') id,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<Image> {
  //   const file = await Image.findByPk(id);
  //   const imageData = new Image();
  //   (imageData.id = file.id),
  //     (imageData.filename = file.filename),
  //     (imageData.originalname = file.originalname),
  //     res.set({
  //       'Content-Type': 'application/json',
  //       'Content-Disposition': 'attachment; filename=' + imageData.filename,
  //     });
  //   const base64 = fs.readFileSync('path-to-image.jpg', 'base64');
  //   const buffer = Buffer.from(base64, 'base64');
  //   console.log(buffer);
  //   return imageData;
  // }
  //toBase64(arr) {
  //     //arr = new Uint8Array(arr) if it's an ArrayBuffer
  //     return btoa(
  //        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
  //     );
  //  }

  //  $('#two').prepend($('<img>',{id:'theImg2',src:`data:image/png;base64,${toBase64( selected[0].image2.data)}`}))
}
