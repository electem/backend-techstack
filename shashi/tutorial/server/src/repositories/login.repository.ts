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

//auth
const auth = require("basic-auth");
export const mwBasicAuth = async (req: any, res: any, next: any):Promise<void | null> => {
  console.log("repository: basic auth");
  const user = await auth(req);
  const username: string = "test";
  const password: string = "123456";
  if (
    user &&
    user.name.toLowerCase() === username.toLowerCase() &&
    user.pass === password
  ) {
    console.log("Basic Auth: success");
    next();
  } else {
    console.log("Basic Auth: failure");
    res.statusCode = 401;
    res.end("Access denied");
  }
};
