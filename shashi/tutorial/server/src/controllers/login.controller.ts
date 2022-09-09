import { Route, Tags, Post, Body, Get, Path } from "tsoa";
import { Userlogin } from "../models/userlogin";
import {
  createLogin,
  ILoginPayload,
  getLogin,
} from "../repositories/login.repository";

@Route("logins")
@Tags("login")
export default class UserloginController {
  @Post("/")
  public async createLogin(@Body() body: ILoginPayload): Promise<Userlogin> {
    return createLogin(body);
  }
  @Get("/:id")
  public async getLogin(@Path() id: string): Promise<Userlogin | null> {
    return getLogin(Number(id));
  }
}
