/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
<<<<<<< HEAD
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
=======
import { Body, Injectable } from '@nestjs/common';
>>>>>>> 29dceecd661f20fa9132e5e255dfa422005be965
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
<<<<<<< HEAD
  constructor() {}
=======
>>>>>>> 29dceecd661f20fa9132e5e255dfa422005be965

  getHello(): ArticleDto[] {
    return this.artcle;
  }

  async createArticle(@Body() article: ArticleDto): Promise<ArticleDto> {
    //console.log(article[1]);
    return article;
  }

  // async uploadedFile(
  //   @UploadedFile() file: QueryFileDto,
  // ): Promise<QueryFileDto> {
  //   const response = {
  //     originalname: file.originalname,
  //     filename: file.filename,
  //   };
  // const encoding = toUnicode(response.filename);
  // const uint8array = new TextEncoder().decode(response.filename);
  // const string = new TextDecoder('utf-8').encode(uint8array);
  // const readStream = fs.createReadStream('./files', { highWaterMark: 16 });
  // const data = [];
  // readStream.on('response', (chunk) => {
  //   data.push(chunk);
  //   console.log('response :', chunk, chunk.length);
  // });
  // readStream.on('end', () => {
  //   console.log('end :', Buffer.concat(data).toString());
  //   // end : I am transferring in bytes by bytes called chunk
  // });
  // readStream.on('error', (err) => {
  //   console.log('error :', err);
  // });
  //console.log(string);

  //   return this.imageRepository.save(response);
  // }
}
