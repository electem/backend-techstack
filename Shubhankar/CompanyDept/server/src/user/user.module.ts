/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';


import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}