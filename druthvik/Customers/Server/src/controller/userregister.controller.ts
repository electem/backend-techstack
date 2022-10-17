import { Route, Tags, Post, Body } from 'tsoa';
import {
  IRegisterLoginPayload,
  registerUser,
} from '../repositories/userregister.repository';
import { UserRegister } from '../models/userregister.model';

@Route('registerLogin')
@Tags('RegisterLogin')
export default class UserRegisterController {
  @Post('/')
  public async registerUser(
    @Body() body: IRegisterLoginPayload,
  ): Promise<UserRegister> {
    return registerUser(body);
  }
}
