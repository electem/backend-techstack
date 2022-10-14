import {getRepository} from "typeorm";
import {User} from '../models'


export interface IUserPayload {
    name: string;
    email: string;
    password: string;
    phonenumber:number
  }
  export const createUser  = async (payload: IUserPayload) :Promise<User> => {
    
    const userRepository = getRepository(User);
    const user = new User()
    return userRepository.save({
      ...user,
      ...payload
    })
}

