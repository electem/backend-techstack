import {getRepository,Connection} from "typeorm";
import {LoginUser} from '../models/loginuser'
import { Injectable } from "@nestjs/common";

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
  