/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';

@Injectable()
export class AppService {
  PostDto: PostDto[] = [
    {
      name: 'raj',
      status: 'active',
      address: 'btm',
      phonenumber: 7676767676,
    },
    {
      name: 'ravi',
      status: 'active',
      address: 'btm',
      phonenumber: 7676754321,
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  async createCustomer(): Promise<PostDto> {
    const article = new PostDto();
    return article;
  }
}
