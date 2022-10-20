/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CustomergroupDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly createdAt: Date;
}
