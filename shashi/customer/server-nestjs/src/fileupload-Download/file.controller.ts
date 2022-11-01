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
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Blob } from 'buffer';
import { Image } from '../fileupload-Download/file.entity';
import { FileSaverService } from './file.service';
import { Response } from 'express';
import { FileSaver } from 'file-saver';
import { createReadStream } from 'fs';
import { join } from 'path';
@Controller('photos')
export class FileController {
  constructor(private FileSaverService: FileSaverService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async imageToBlob(@UploadedFile() file: Express.Multer.File) {
    return this.FileSaverService.imageToBlob(file);
  }

  @Get()
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
  // @Get('/:id')
  // async download(
  //   @Query('fn') originalname: string,
  //   @Response({ passthrough: true }) res,
  // ): Promise<StreamableFile> {
  //   console.log('process.cwd() : ', process.cwd());

  //   const file = createReadStream(
  //     join(process.cwd(), `uploads/${originalname}`),
  //   );

  //   res.set({
  //     'Content-Disposition': `attachment; originalname="${originalname}"`,
  //   });
  //   return new StreamableFile(file);
  // }
}
