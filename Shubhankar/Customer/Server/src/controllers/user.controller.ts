import { User } from "../models";
import { createUser, IUserPayload , myBasicAuth} from "../repositories/user.repository";
import { Body, Get, Post, Route, Tags , Request} from "tsoa";

@Route("loginusers")
@Tags("loginusers")
export default class UserController {
 @Post("/")
 public async createUser(@Body() body: IUserPayload): Promise<User> {
   return createUser(body)
 }

 @Get("/")
 public async getAuthentication(
    @Request() payload: IUserPayload,
    @Request()  name: string
 ): Promise<User | String> {
   return myBasicAuth(payload, name);
 }
}
