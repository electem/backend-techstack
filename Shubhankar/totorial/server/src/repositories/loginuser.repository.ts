import {getRepository} from "typeorm";
import {LoginUser} from '../models/loginuser'

export interface IloginUserPayload {
    username: string;
    password: string;
    role: string
}
export const createloginUser  = async (payload: IloginUserPayload) :Promise<LoginUser> => {
    const loginuserRepository = getRepository(LoginUser);
    const loginuser = new LoginUser()
    return loginuserRepository.save({
      ...loginuser,
      ...payload
    })
  }
  