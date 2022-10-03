/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Injectable } from '@nestjs/common';
import { ArticleDto } from './articles/dto/article.dto';

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

  getHello(): ArticleDto[] {
    return this.artcle;
  }

  async createArticle(@Body() article: ArticleDto): Promise<ArticleDto> {
    //console.log(article[1]);
    return article;
  }
}
