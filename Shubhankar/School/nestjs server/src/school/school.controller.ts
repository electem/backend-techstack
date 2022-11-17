/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { AuthGuard } from '@nestjs/passport';
import { SchoolDto } from './dto/school.dto';
import { School } from './school.entity';
import { SchoolService } from './school.service';

//@UseGuards(AuthGuard('jwt'))
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

 @Get(':schoolid')
  schoolbyId(@Param('schoolid') id: string) {
    return this.schoolService.schoolbyId(+id);
  }

  @Put('/')
  async updateSchool(@Body() schoolDto: SchoolDto) {
    return await this.schoolService.updateSchool(schoolDto);
  }

  @Delete('/:schoolid')
  public async deleteSchool(@Param('schoolid') id: string): Promise<void> {
    const school = this.schoolService.removeSchool(+id);
    if (!school) {
      throw new NotFoundException('school not exist');
    }
    return school;

  }
}
