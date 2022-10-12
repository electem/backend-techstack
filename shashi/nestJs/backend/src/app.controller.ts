/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

import { ArticleDto } from './articles/dto/article.dto';

@Controller('article')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ArticleDto[] {
    return this.appService.getHello();
  }
  // @Post()
  // async createArticle(@Body() article: ArticleDto): Promise<ArticleDto> {
  //   return this.appService.createArticle(article);
  // }

  // @Post()
  // async createImage(image: QueryFileDto): Promise<QueryFileDto> {
  //   return this.appService.createImage(image);
  // }

  @Post()
  createArticle(@Body() article: ArticleDto): Promise<ArticleDto> {
    return this.appService.createArticle(article);
  }
  // @Get(':id')
  // GetProductById(@Param() param: number) {
  //     return this.article.find(p => p.id === +param.id);
  // }
}
