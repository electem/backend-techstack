import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import {LoginUser} from '../models/loginuser'
import { next, response, request } from "inversify-express-utils";
import {createloginUser, getloginUser, IloginUserPayload, mwBasicAuth} from '../repositories/loginuser.repository'
import { getRepository } from "typeorm";


@Route("loginusers")
@Tags("loginUser")
export default class loginUserController {
  @Get("/")
  public async getAuth(
   @request()  res: IloginUserPayload,
   @request()  username:any
  ): Promise<boolean | null> {
    return mwBasicAuth(res, username);
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
