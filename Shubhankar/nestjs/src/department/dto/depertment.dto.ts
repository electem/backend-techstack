/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class DepertmentDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly address: string;


}

