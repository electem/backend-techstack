import { getRepository } from "typeorm";
import { User } from "../models";
import * as crypto from "crypto";

export interface IUserPayload {
  name: string;
  email: string;
  password: string;
  phonenumber: number;
}
export const createUser = async (payload: IUserPayload): Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User();
  const hash = crypto.createHash("md5").update(payload.password).digest("hex");
  payload.password = hash;
  return userRepository.save({
    ...user,
    ...payload,
  });
};
export const myBasicAuth = async (
  payload: IUserPayload,
  username: string
): Promise<User | String> => {
  const userRepository = getRepository(User);
  const userDB = await userRepository.findOne({ name: username });
  const hash = crypto.createHash("md5").update(payload.password).digest("hex");
  payload.password = hash;
  if (userDB && userDB.password === payload.password) {
    return userDB;
  } else {
    return "User not found";
  }
};
