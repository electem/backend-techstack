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
  Query,
  UseGuards,
} from '@nestjs/common';
import { School } from './school.entity';
import { SchoolDto } from './school.dto';
import { SchoolService } from './school.service';
import { AuthGuard } from '@nestjs/passport';
import { Page } from './pagination.model';
import { PageRequest } from './pageRequest.model';
import { integer } from '@elastic/elasticsearch/lib/api/types';
import { DeleteSchool } from './schooldeleteEntity';

//@UseGuards(AuthGuard())
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
  @Post()
  async createSchool(@Body() school: SchoolDto) {
    return await this.schoolService.createSchool(school);
  }
  @Get('/all')
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
  @Get()
  public async getAllSchoolsByPage(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('search') search: string,
  ): Promise<Page<School>> {
    try {
      const pageRequest: PageRequest = PageRequest.from(page, size, search);
      return this.schoolService.getAllSchoolsByPage(pageRequest);
    } catch (error) {}
  }
  @Delete()
  public async deleteAllSchool(@Body() body): Promise<void> {
    let data: DeleteSchool[] = [];
    data = body.ids;
    console.log(data);
    this.schoolService.deleteAllSchool(data);
  }
  // @Get('/:schoolname')
  // async findSchoolByName(@Param('schoolname') schoolname): Promise<School[]> {
  //   return this.schoolService.findByUsername(schoolname);
  // }
}
