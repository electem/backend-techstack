/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;
}