/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { School } from './school/school.entity';
import { SchoolModule } from './school/school.module';
import { Student } from './student/student.entity';
import { Teacher } from './teacher/teacher.entity';
import { TaskEntity } from './ToDo/task.entity';
import { TodoEntity } from './ToDo/toDo.entity';
import { TodoModule } from './ToDo/toDo.module';
import { UserEntity } from './user/user.entity';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'cybis@ban',
      database: 'School',
      entities: [UserEntity, TodoEntity, TaskEntity,School,Teacher,Student],
      synchronize: true,
    }),
   AuthModule,
    UsersModule,
    TodoModule,
    SchoolModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
