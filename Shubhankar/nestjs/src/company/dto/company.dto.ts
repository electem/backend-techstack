/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CompanyDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly department: string;

  @ApiProperty()
  readonly address: string;


}
