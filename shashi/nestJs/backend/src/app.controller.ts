/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleDto } from './articles/dto/article.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('article')
  getHello(): ArticleDto[] {
    return this.appService.getHello();
  }

  @Post('article')
  createArticle(@Body() article: ArticleDto) {
    console.log('article object is creating');
    return article;
  }
}
