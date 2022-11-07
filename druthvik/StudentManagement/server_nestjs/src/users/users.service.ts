import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async findByEmail(username: string) {
    return await User.findOne({
      where: {
        username: username,
      },
    });
  }
}
