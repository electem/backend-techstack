import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('todos')
  getTodos() {
    return ['Watch Movie', 'Take Health Test', 'Play Cricket'];
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  gethello() {
    return ['Watch Movie', 'Take Health Test', 'Play Cricket'];
  }
}
