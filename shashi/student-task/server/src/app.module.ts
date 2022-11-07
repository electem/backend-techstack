/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './Auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entity/user.entity';
import { TodoEntity } from './todo/entity/todo.entity';
import { TaskEntity } from './todo/entity/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'DBstudentTask',
      entities: [TodoEntity, UserEntity, TaskEntity],
      synchronize: true,
    }),
    AuthModule,
    TodoModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
