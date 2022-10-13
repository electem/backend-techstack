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
  UploadedFile,
  UseInterceptors,
  Res,
  StreamableFile,
  Header,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Blob } from 'buffer';
import { Image } from './images/image.entity';
import type { Response } from 'express';
import { FileSaverService } from './file.service';
import { FileSaver } from 'file-saver';
@Controller('photos')
export class FileController {
  constructor(private FileSaverService: FileSaverService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async imageToBlob(@UploadedFile() file: Express.Multer.File) {
    const encodeImage = new Blob([file.buffer], { type: file.mimetype });
    const image = await Image.create({ filename: encodeImage });
    return { id: image.id, filename: image.filename };
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
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
        'Content-Disposition': 'attachment; filename="' + imageData.filename,
      });

    // const blob = new Blob([imageData.filename], {
    //   type: 'base64',
    // });
    const size = new Blob([imageData.filename]).size;
    console.log(size);
    const blob = new Blob([imageData.filename], {
      type: 'data:image/png;base64',
    });
    FileSaver.saveAs(blob, 'screenshot.png');
    return imageData;
  }
}
