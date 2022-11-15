/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { School } from './school.entity';
import { SchoolDto } from './school.dto';
import { SchoolService } from './school.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
  @Post()
  async createSchool(@Body() school: SchoolDto) {
    return await this.schoolService.createSchool(school);
  }
  @Get()
  async findAllSchool(): Promise<Array<School>> {
    return this.schoolService.getAllSchoolWithTeacher();
  }
  @Get('/:id')
  async findOneSchool(@Param('id') id): Promise<School> {
    return this.schoolService.findOneSchool(id);
  }
  @Put('/')
  async updateSchool(@Body() schoolDto: SchoolDto) {
    return await this.schoolService.updateSchool(schoolDto);
  }
  @Delete('/:id')
  public async deleteSchool(@Param('id') id: string): Promise<void> {
    const school = this.schoolService.deleteSchool(+id);
    if (!school) {
      throw new NotFoundException('school does not exist!');
    }
    return school;
  }
}
