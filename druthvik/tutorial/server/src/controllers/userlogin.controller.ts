import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { userLogin } from '../models/userlogin';
import { User } from '../models/user';
import {
  createUser,
  getUser,
  IUserLoginPayload,
  mwBasicAuth,
} from '../repositories/userlogin.repository';

@Route('userlogin')
@Tags('UserLogin')
export default class UserLoginController {
  @Post('/')
  public async createUser(@Body() body: IUserLoginPayload): Promise<userLogin> {
    return createUser(body);
  }

  @Get('/:id')
  public async getUser(@Path() id: string): Promise<userLogin | null> {
    return getUser(Number(id));
  }

  @Get('/')
  public async getAuth(): Promise<void | null> {
    return mwBasicAuth('', '', '');
  }
}
