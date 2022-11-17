/* eslint-disable prettier/prettier */
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Image } from './fileupload/file.entity';
import { ImageModule } from './fileupload/file.module';
import { School } from './school/school.entity';
import { SchoolModule } from './school/school.module';
import { Student } from './student/student.entity';
import { StudentModule } from './student/student.module';
import { Teacher } from './teacher/teacher.entity';
import { TeacherModule } from './teacher/teacher.module';
import { TaskEntity } from './ToDo/task.entity';
import { TodoEntity } from './ToDo/toDo.entity';
import { TodoModule } from './ToDo/toDo.module';
import { UserEntity } from './user/user.entity';
import { UsersModule } from './user/user.module';

@Module({
  imports: [  MailerModule.forRoot({
    transport: {
      host: 'mail.electems.com',
      port: 465,
      ssl: false,
      tls: true,
      auth: {
        user: 'shubhankar@electems.com',
        pass: 'cybis@ban',
      },
    },
  }),
   TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'cybis@ban',
      database: 'School',
      entities: [UserEntity, TodoEntity, TaskEntity, School, Teacher, Student,Image],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TodoModule,
    SchoolModule,
    TeacherModule,
    StudentModule,
    ImageModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
