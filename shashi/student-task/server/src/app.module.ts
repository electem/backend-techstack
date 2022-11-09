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
import { School } from './school/school.entity';
import { SchoolModule } from './school/school.module';
import { Teacher } from './teacher/teacher.entity';
import { TeacherModule } from './teacher/teacher.module';
import { Student } from './student/student.entity';
import { StudentModule } from './student/student.module';
import { Image } from './fileupload-Download/file.entity';
import { ImageModule } from './fileupload-Download/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'DBstudentTask',
      entities: [
        TodoEntity,
        UserEntity,
        TaskEntity,
        School,
        Teacher,
        Student,
        Image,
      ],
      synchronize: true,
    }),
    AuthModule,
    TodoModule,
    UsersModule,
    SchoolModule,
    TeacherModule,
    StudentModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
