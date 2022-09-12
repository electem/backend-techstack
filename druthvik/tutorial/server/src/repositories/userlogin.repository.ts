import { Injectable } from '@nestjs/common';
import { Connection, getRepository } from 'typeorm';
import { userLogin } from '../models/userlogin';
import auth from 'basic-auth';

export interface IUserLoginPayload {
  userName: string;
  password: string;
  role: string;
}
@Injectable()
export class userLoginRepository {
  constructor(private readonly connection: Connection) {}
}

export const createUser = async (
  payload: IUserLoginPayload,
): Promise<userLogin> => {
  const userRepository = getRepository(userLogin);
  const user = new userLogin();
  return userRepository.save({
    ...user,
    ...payload,
  });
};

export const getUser = async (id: number): Promise<userLogin | null> => {
  const userRepository = getRepository(userLogin);
  const user = await userRepository.findOne({ id: id });
  if (!user) return null;
  return user;
};

export const mwBasicAuth = async (
  req: any,
  res: any,
  next: any,
): Promise<void | null> => {
  console.log('repository: basic auth');

  const user = auth(req);
  const username = 'test';
  const password = '123456';
  if (
    user &&
    user.name.toLowerCase() === username.toLowerCase() &&
    user.pass === password
  ) {
    console.log('Basic Auth: success');
    next();
  } else {
    console.log('Basic Auth: failure');
    res.statusCode = 401;
    res.end('Access denied');
  }
};
