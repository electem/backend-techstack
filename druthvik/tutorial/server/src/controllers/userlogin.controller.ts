import { Next } from '@nestjs/common/decorators';
import { NextFunction, response } from 'express';
import { Get, Route, Tags, Post, Body, Path, Request, Response } from 'tsoa';
import { userLogin } from '../models/userlogin';
import { userLoginRepository } from '../repositories/userlogin.repository';

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
  public async getAuth(
    @Request() res: IUserLoginPayload,
    @Request() userName: any,
  ): Promise<boolean | null> {
    return mwBasicAuth(res, userName);
  }
}
