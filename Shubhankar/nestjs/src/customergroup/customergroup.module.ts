/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CustomergroupController } from './customergroup.controller';
import { CustomergroupProviders } from './customergroup.provider';
import {CustomergroupService } from './customergroup.service';

@Module({
  imports: [],
  controllers: [CustomergroupController],
  providers: [CustomergroupService, ...CustomergroupProviders],
})
export class CustomergroupModule {}
