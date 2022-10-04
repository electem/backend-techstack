import { Connection, getRepository } from "typeorm";
import { Injectable } from "@nestjs/common/decorators";
import { Userlogin } from "../models/userlogin";
import crypto from "crypto";

export interface ILoginPayload {
  userName: string;
  password: string;
  role: string;
}
@Injectable()
export class Userloginrepository {
  constructor(private readonly connection: Connection) {}
}
export const createLogin = async (
  payload: ILoginPayload
): Promise<Userlogin> => {
  const loginRepository = getRepository(Userlogin);
  const login = new Userlogin();
  return loginRepository.save({
    ...login,
    ...payload,
  });
};
export const getLogin = async (id: number): Promise<Userlogin | null> => {
  const loginRepository = getRepository(Userlogin);
  const login = await loginRepository.findOne({ id: id });
  if (!login) return null;
  return login;
};

//auth
export const mwBasicAuth = async (
  payload: ILoginPayload,
  userName: string
): Promise<boolean> => {
  const userRepository = getRepository(Userlogin);
  const userDB = await userRepository.findOne({ userName: userName });
  const hash = crypto.createHash("md5").update(payload.password).digest("hex");
  payload.password = hash;
  if (userDB && userDB.password === payload.password) {
    return true;
  } else {
    return false;
  }
};
