import { getRepository } from 'typeorm';
import { UserRegister } from '../models/userregister.model';
import crypto from 'crypto';

export interface IRegisterLoginPayload {
  name: string;
  email: string;
  password: string;
  phonenumber: number;
}

export const registerUser = async (
  payload: IRegisterLoginPayload,
): Promise<UserRegister> => {
  const registerRepository = getRepository(UserRegister);
  const hash = crypto.createHash('md5').update(payload.password).digest('hex');
  const registeruser = new UserRegister();
  payload.password = hash;
  return registerRepository.save({
    ...registeruser,
    ...payload,
  });
};
