import { Get, Route } from 'tsoa';
import { getRepository } from 'typeorm';

interface PingResponse {
  message: string;
}

@Route('ping')
export default class PingController {
  @Get('/')
  public async getMessage(): Promise<PingResponse> {
    return {
      message: 'pong',
    };
  }
}
