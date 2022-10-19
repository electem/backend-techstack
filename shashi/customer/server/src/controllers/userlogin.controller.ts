import { Get, Route, Tags, Post, Body, Path, Put, Request } from "tsoa";
import { UserRegistration } from "../models/userLogin";
import {
  IUserRegistrationPayload,
  createUser,
  mwBasicAuth,
} from "../repositories/userlogin.repository";

@Route("userRegistration")
@Tags("userRegistration")
export default class UserRegistrationController {
  @Post("/")
  public async createUser(
    @Body() body: IUserRegistrationPayload
  ): Promise<UserRegistration> {
    return createUser(body);
  }
  @Get("/")
  public async getUserAuthentication(
    payload: IUserRegistrationPayload,
    name: string
  ): Promise<boolean> {
    return mwBasicAuth(payload, name);
  }
}
