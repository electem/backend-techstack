import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';

import { SchoolService } from './school.service';
import { SchoolDto } from './school.dto';

@Controller('school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  @Post()
  async create(@Body() schoolDto: SchoolDto) {
    return await this.schoolService.createSchool(schoolDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolService.findSchoolByID(+id);
  }
  @Get()
  findAll() {
    return this.schoolService.getAllSchool();
  }

  @Put('/')
  async update(@Body() schoolDto: SchoolDto) {
    return await this.schoolService.updateSchool(schoolDto);
  }
}
