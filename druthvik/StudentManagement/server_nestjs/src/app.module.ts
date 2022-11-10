/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { FileModule } from './file/file.module';
import { User } from './users/user.entity';
import { Student } from './student/student.entity';
import { Subject } from 'typeorm/persistence/Subject';
import { Teacher } from './teacher/teacher.entity';
import { SchoolModule } from './school/school.module';
import { School } from './school/school.entity';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { Files } from './file/file.entitiy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'studentmanagement',
      entities: [User, Student, Subject, Teacher, School, Files],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'mail.electems.com',
        port: 465,
        ssl: false,
        tls: true,
        auth: {
          user: 'druthvik@electems.com',
          pass: 'cybRVE12#',
        },
      },
    }),
    AuthModule,
    UsersModule,
    FileModule,
    SchoolModule,
    StudentModule,
    TeacherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
