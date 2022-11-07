/* eslint-disable prettier/prettier */
import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';


export class CreateTodoDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @MaxLength(500)
  description?: string;
}