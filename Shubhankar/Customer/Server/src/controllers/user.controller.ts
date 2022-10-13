import { User } from "../models";
import { createUser, IUserPayload, mwBasicAuth } from "../repositories/user.repository";
import { Body, Get, Post, Route, Tags } from "tsoa";
import { request } from "inversify-express-utils/lib/decorators";

@Route("loginusers")
@Tags("loginusers")
export default class UserController {
 @Post("/")
 public async createUser(@Body() body: IUserPayload): Promise<User> {
   return createUser(body)
 }

 @Get("/")
  public async getAuth(
   @request()  res: IUserPayload,
   @request()  username:any
  ): Promise<boolean | null> {
    return mwBasicAuth(res, username);
  }

}