/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './department/department.module';
import { Company } from './company/company.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { Department } from './department/department.entity';
import { AuthModule } from './Auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entity/user.entity';
import { TodoEntity } from './todo/entity/todo.entity';
import { TaskEntity } from './todo/entity/task.entity';
import { Image } from './fileupload-Download/file.entity';
import { ImageModule } from './fileupload-Download/file.module';
import { FileToFolder } from './fileupload-Download/fileTofolder.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'company2',
      entities: [
        Company,
        Department,
        TodoEntity,
        UserEntity,
        TaskEntity,
        Image,
        FileToFolder,
      ],
      synchronize: true,
    }),
    CompanyModule,
    DepartmentModule,
    AuthModule,
    TodoModule,
    UsersModule,
    ImageModule,
    MailerModule.forRoot({
      transport: {
        host: 'mail.electems.com',
        port: 465,
        ssl: false,
        tls: true,
        auth: {
          user: 'shashi@electems.com',
          pass: 'cybRVE12#',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
