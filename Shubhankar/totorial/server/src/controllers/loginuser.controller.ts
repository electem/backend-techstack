import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import {LoginUser} from '../models/loginuser'
import {createloginUser, IloginUserPayload} from '../repositories/loginuser.repository'


@Route("loginusers")
@Tags("loginUser")
export default class loginUserController {
    @Post("/")
    public async createUser(@Body() body:IloginUserPayload): Promise<LoginUser> {
      return createloginUser(body)
    }
}
