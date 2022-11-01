import { IsString, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
