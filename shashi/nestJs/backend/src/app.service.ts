/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import {
  Body,
  FileTypeValidator,
  Injectable,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';

import { ArticleDto } from './articles/dto/article.dto';
import { Image } from './fileupload/fileupload.entity';
import fs from 'fs';
import { buffer } from 'stream/consumers';
import { toUnicode } from 'punycode';

@Injectable()
export class AppService {
  artcle: ArticleDto[] = [
    {
      id: 1,
      title: 'qqqqq',
      description: 'jsbdjswbdsw',
    },
    {
      id: 2,

      title: 'wwww',
      description: 'wwww',
    },
    {
      id: 3,
      title: 'mmmm',
      description: 'mmmm',
    },
    {
      id: 4,
      title: 'pppp',
      description: 'jsbdjswbdsw',
    },
    {
      id: 5,
      title: 'nnnn',
      description: 'nnnn',
    },
  ];
  constructor() {}

  getHello(): ArticleDto[] {
    return this.artcle;
  }

  async createArticle(@Body() article: ArticleDto): Promise<ArticleDto> {
    //console.log(article[1]);
    return article;
  }
}
