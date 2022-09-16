import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import {LoginUser} from '../models/loginuser'
import { next, response, request } from "inversify-express-utils";
import {createloginUser, getloginUser, IloginUserPayload, mwBasicAuth} from '../repositories/loginuser.repository'


@Route("loginusers")
@Tags("loginUser")
export default class loginUserController {
    @Get("/")
    public async getAuth(@Request() request: any): Promise<boolean> {
      return mwBasicAuth(request);
    }

    @Post("/")
    public async createUser(@Body() body:IloginUserPayload): Promise<LoginUser> {
      return createloginUser(body)
    }

    @Get("/:id")
  public async getUsers(@Path() id: string) {
    return getloginUser(Number(id))
  }
}
