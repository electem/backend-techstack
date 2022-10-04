/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Mongoose } from 'mongoose';

@Module({
  imports: [Mongoose],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
