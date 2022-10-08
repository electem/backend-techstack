import { Get, Route, Tags } from 'tsoa';
import { Test } from '../models/test';
import { getTests } from '../repositories/test.repository';

@Route('tests')
@Tags('test')
export default class TestController {
  
  @Get('/')
  public async getTests(): Promise<Array<Test>> {
    return getTests();
  }
}
