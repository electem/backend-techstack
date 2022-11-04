/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Company } from './company/company.entity';
import { Department } from './department/department.entity';
import { CompanyModule } from './company/comapny.module';
import { DepartmentModule } from './department/department.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'companydept',
      entities: [Company, Department, User],
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
    CompanyModule,
    AuthModule,
    UsersModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
