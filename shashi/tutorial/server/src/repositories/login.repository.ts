import { getRepository } from "typeorm";
import { Userlogin } from "../models/userlogin";
import auth from "basic-auth";
import crypto from "crypto";

export interface ILoginPayload {
  userName: string;
  password: string;
  role: string;
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
export const mwBasicAuth = async (userName: string): Promise<boolean> => {
  console.log("repository: basic auth");
  const loginRepository = getRepository(Userlogin);
  const user = await loginRepository.findOne({ userName: userName });
  console.log(user);
  const username = user?.userName;
  
  const password = user?.password;
  console.log(user?.password);
  const hash = crypto.createHash("md5").update(user?.password!).digest("hex");
  user!.password = hash;
  console.log(user?.password);
  if (
    user &&
    user.userName?.toLowerCase() === username?.toLowerCase() &&
    user.password != password
  ) {
    return true;
  } else {
    return false;
  }
};
