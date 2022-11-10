/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './file.entity';
import { Readable } from 'stream';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      this.imageRepository.save(file);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return { file, message: 'fileuploaded succesfully' };
  }
  async download(@Res() res, @Param('originalname') originalname) {
    const imageDownloadFromDB = await this.imageRepository.findOneBy({
      originalname,
    });
    const stream = Readable.from(imageDownloadFromDB.buffer);
    const downloadFile = res.set({
      'Content-Type': 'image/pdf/txt',
    });
    return stream.pipe(downloadFile);
  }
}
