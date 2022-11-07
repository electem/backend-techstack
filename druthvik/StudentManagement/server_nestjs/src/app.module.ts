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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'studentmanagement',
      entities: [User],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
