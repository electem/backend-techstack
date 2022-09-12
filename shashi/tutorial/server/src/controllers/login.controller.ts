import { next, response, request } from "inversify-express-utils";
import { Route, Tags, Post, Body, Get, Path, Request } from "tsoa";
import { Userlogin } from "../models/userlogin";
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
  public async getAuth(@Request() request: any): Promise<boolean> {
    return mwBasicAuth(request);
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
