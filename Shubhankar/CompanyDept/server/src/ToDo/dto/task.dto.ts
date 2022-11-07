/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  createdOn?: Date;
}