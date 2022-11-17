/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */

import { UserDto } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/user.entity';
import { TodoDto } from 'src/ToDo/dto/todo';
import { TaskEntity } from 'src/ToDo/task.entity';
import { TodoEntity } from 'src/ToDo/toDo.entity';
import { TaskDto } from 'src/ToDo/dto/task.dto';

export const toTodoDto = (data: TodoEntity): TodoDto => {
  const { id, name, description, tasks, owner } = data;

  let todoDto: TodoDto = {
    id,
    name,
    description,
    owner: owner ? toUserDto(owner) : null,
  };

  if (tasks) {
    todoDto = {
      ...todoDto,
      tasks: tasks.map((task: TaskEntity) => toTaskDto(task)),
    };
  }

  return todoDto;
};

export const toTaskDto = (data: TaskEntity): TaskDto => {
  const { id, name } = data;

  let taskDto: TaskDto = {
    id,
    name,
  };

  return taskDto;
};

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email } = data;

  let userDto: UserDto = {
    id,
    username,
    email,
  };

  return userDto;
};
