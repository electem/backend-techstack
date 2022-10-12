/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { filesProviders } from './file.providers';
import { FileController } from './image.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, FileController],
  providers: [AppService, ...filesProviders],
})
export class AppModule {}
