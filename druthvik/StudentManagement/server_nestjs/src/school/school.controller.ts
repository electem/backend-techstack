import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';

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

  @Delete('/:id')
  public async deleteSchool(@Param('id') id: string): Promise<void> {
    const school = this.schoolService.deleteSchool(+id);
    if (!school) {
      throw new NotFoundException('School does not exist!');
    }
    return school;
  }
}
