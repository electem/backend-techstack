/* eslint-disable prettier/prettier */
import { UserDto } from 'src/users/dto/user.dto';

export interface LoginStatus {
  username: string;
  accessToken: any;
  expiresIn: any;
}
