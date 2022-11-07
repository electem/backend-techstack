/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './user.service';


@Controller('loginuser')
export class UserController {
  constructor(private userService: UsersService) {}

}
