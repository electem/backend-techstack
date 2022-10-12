/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { DatabaseModule } from './database.module';
import { filesProviders } from './file.providers';
import { FileController } from './image.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, FileController],
  providers: [AppService, ...filesProviders],
=======
import { UrlGeneratorModule } from 'nestjs-url-generator';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> 29dceecd661f20fa9132e5e255dfa422005be965
})
export class AppModule {}
