/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

import { TaskDto } from './task.dto';

export class TodoDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  createdOn?: Date;
  description?: string;

  owner: UserDto;

  tasks?: TaskDto[];
}