/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SchoolDto } from './dto/school.dto';
import { School } from './school.entity';
import { SchoolService } from './school.service';

@Controller('school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  @Post()
  async createSchool(@Body() schoolDto: SchoolDto) {
    return await this.schoolService.createSchool(schoolDto);
  }

  @Get()
  async allSchool(): Promise<Array<School>> {
    return await this.schoolService.getAllSchool();
  }

  
  @Get(':id')
  schoolbyId(@Param('id') id: string) {
    return this.schoolService.schoolbyId(+id);
  }

  @Put('/')
  async updateSchool(@Body() schoolDto: SchoolDto) {
    return await this.schoolService.updateSchool(schoolDto);
  }
}
