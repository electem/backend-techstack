/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import { IdsDto } from './dto/ids.dto';
import { SchoolDto } from './dto/school.dto';
import { PageRequest } from './pageRequest.model';
import { Page } from './pagination.model';
import { School } from './school.entity';
import { SchoolService } from './school.service';

@Controller('school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  @Post()
  async createSchool(@Body() schoolDto: SchoolDto) {
    return await this.schoolService.createSchool(schoolDto);
  }

  @Get('all')
  async allSchool(): Promise<Array<School>> {
    return await this.schoolService.getAllSchool();
  }

  @Get(':schoolid')
  schoolbyId(@Param('schoolid') id: number) {
    return this.schoolService.schoolbyId(id);
  }

  @Put('/')
  async updateSchool(@Body() schoolDto: SchoolDto) {
    return await this.schoolService.updateSchool(schoolDto);
  }

  @Delete('/:schoolid')
  public async deleteSchool(@Param('schoolid') id: number): Promise<void> {
    const school = this.schoolService.removeSchool(id);
    if (!school) {
      throw new NotFoundException('school not exist');
    }
    return school;
  }

  @Get()
  public async getAllUsersByPage(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('search') search: string,
  ): Promise<Page<School>> {
    try {
      const pageRequest: PageRequest = PageRequest.from(page, size, search);
      return this.schoolService.getAllUsersByPage(pageRequest);
    } catch (error) {}
  }

  @Delete()
  public async deleteAllSchool(@Body() body): Promise<void> {
    let data: IdsDto[] = [];
    data = body.ids;
    console.log(data);
    this.schoolService.removeAllSchool(data);
  }
}
