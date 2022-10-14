import { User } from "../models";
import { createUser, IUserPayload } from "../repositories/user.repository";
import { Body, Get, Post, Route, Tags } from "tsoa";


@Route("loginusers")
@Tags("loginusers")
export default class UserController {
 @Post("/")
 public async createUser(@Body() body: IUserPayload): Promise<User> {
   return createUser(body)
 }


}