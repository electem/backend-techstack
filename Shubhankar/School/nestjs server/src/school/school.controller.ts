/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { SchoolDto } from './dto/school.dto';
import { SchoolService } from './school.service';

@Controller('school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  @Post()
  async createSchool(@Body() schoolDto: SchoolDto) {
    return await this.schoolService.createSchool(schoolDto);
  }
}
