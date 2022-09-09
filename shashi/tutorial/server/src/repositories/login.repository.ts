import { getRepository } from "typeorm";
import { Userlogin } from "../models/userlogin";

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
