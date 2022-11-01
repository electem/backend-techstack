/* eslint-disable prettier/prettier */
// export declare class FileSaverService {
//   readonly isFileSaverSupported: boolean;
//   genType(fileName?: string): string;
//   save(blob: Blob, fileName?: string, filtType?: string): void;
//   saveText(txt: string, fileName?: string): void;
// }
/* eslint-disable prettier/prettier */
import { Injectable, Inject, UploadedFile } from '@nestjs/common';
import { Blob } from 'buffer';
import { Image } from '../fileupload-Download/file.entity';
@Injectable()
export class FileSaverService {
  constructor(
    @Inject('Image_REPOSITORY')
    private imageModel: typeof Image,
  ) {}
  public async imageToBlob(@UploadedFile() file: Express.Multer.File) {
    const encodeImage = new Blob([file.buffer], { type: file.mimetype });
    const image = await Image.create({ filename: encodeImage });
    const imagedate = new this.imageModel({
      id: image.id,
      filename: image.filename,
      originalname: file.originalname,
    });
    return {
      imagedate,
    };
  }
}
