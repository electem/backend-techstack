/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/user.module';
import { TodoEntity } from './toDo.entity';
import { TaskEntity } from './task.entity';
import { UserEntity } from 'src/user/user.entity';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([TodoEntity, TaskEntity, UserEntity]),
  ],
  controllers: [TodoController, TaskController],
  providers: [TodoService, TaskService],
})
export class TodoModule {}