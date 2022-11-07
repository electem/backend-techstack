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

//@UseGuards(AuthGuard())
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
  @Post()
  async createSchool(@Body() school: SchoolDto) {
    return await this.schoolService.createSchool(school);
  }
}
