import {getRepository,Connection} from "typeorm";
import {LoginUser} from '../models/loginuser'
import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";

export interface IloginUserPayload {
    username: string;
    password: string;
    role: string
}
@Injectable()
export class loginuserRepository{
constructor(private readonly connection : Connection){}
}

export const createloginUser  = async (payload: IloginUserPayload) :Promise<LoginUser> => {
    const loginuserRepository = getRepository(LoginUser);
    const loginuser = new LoginUser()
    return loginuserRepository.save({
      ...loginuser,
      ...payload
    })
  }
  export const getloginUser  = async (id: number) :Promise<LoginUser | null> => {
    const loginuserRepository = getRepository(LoginUser);
    const loginuser = await loginuserRepository.findOne({ id: id});
    if(!loginuser) return null;
    return loginuser;

    
  }
  
export const mwBasicAuth = async (
  payload: IloginUserPayload,
  userName: string
): Promise<boolean> => {
  const userRepository = getRepository(LoginUser);
  const userDB = await userRepository.findOne({ username: userName });
  const hash = crypto.createHash("md5").update(payload.password).digest("hex");
  payload.password = hash;
  if (userDB && userDB.password === payload.password) {
    return true;
  } else {
    return false;
  }
};