import { Injectable } from '@nestjs/common';
import { Connection, getRepository } from 'typeorm';
import { userLogin } from '../models/userlogin';

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
