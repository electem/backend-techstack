/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly phonenumber: number;
}
