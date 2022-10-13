/* eslint-disable prettier/prettier */
import { Injectable, StreamableFile, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import fs from 'fs';
import { Image } from './images/image.entity';

@Injectable()
export class AppService {
  constructor(private localFilesRepository: Repository<Image>) {}
  getHello(): string {
    return 'Hello World!';
  }
}
