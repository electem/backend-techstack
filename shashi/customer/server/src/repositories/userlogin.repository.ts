import { getManager, getRepository } from "typeorm";
import { UserRegistration } from "../models/userLogin";
import crypto from "crypto";

export interface IUserRegistrationPayload {
  name: string;
  email: string;
  password: string;
  phonenumber: number;
}

export const createUser = async (
  payload: IUserRegistrationPayload
): Promise<UserRegistration> => {
  const UserloginRepository = getRepository(UserRegistration);
  const user = new UserRegistration();
  const hash = crypto.createHash("md5").update(payload.password).digest("hex");
  payload.password = hash;
  return UserloginRepository.save({
    ...user,
    ...payload,
  });
};

export const mwBasicAuth = async (
  payload: IUserRegistrationPayload,
  name: string
): Promise<boolean> => {
  const userRepository = getRepository(UserRegistration);
  const userDB = await userRepository.findOne({ name: name });
  const hash = crypto.createHash("md5").update(payload.password).digest("hex");
  payload.password = hash;
  if (userDB && userDB.password === payload.password) {
    return true;
  } else {
    return false;
  }
};
