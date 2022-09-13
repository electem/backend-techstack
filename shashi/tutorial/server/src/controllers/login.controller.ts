import { next, response, request } from "inversify-express-utils";
import { Route, Tags, Post, Body, Get, Path, Request } from "tsoa";
import { Userlogin } from "../models/userlogin";
import { Userloginrepository } from "../repositories/login.repository";
import {
  createLogin,
  ILoginPayload,
  getLogin,
  mwBasicAuth,
} from "../repositories/login.repository";

@Route("logins")
@Tags("login")
export default class UserloginController {
  @Get("/")
  public async getAuth(
    @Request() res: ILoginPayload,
    @Request() userName: any
  ): Promise<boolean | null> {
    return mwBasicAuth(res, userName);
  }
  @Post("/")
  public async createLogin(@Body() body: ILoginPayload): Promise<Userlogin> {
    return createLogin(body);
  }
  @Get("/:id")
  public async getLogin(@Path() id: string): Promise<Userlogin | null> {
    return getLogin(Number(id));
  }
}
