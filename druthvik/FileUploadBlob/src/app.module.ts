/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FileController } from './file.controller';

import { databaseProviders } from './database.provider';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FileController],
  providers: [...databaseProviders],
})
export class AppModule {}
