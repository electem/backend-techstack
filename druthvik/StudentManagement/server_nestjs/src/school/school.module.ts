import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './school.entity';
import { schoolProviders } from './school.provider';

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  providers: [SchoolService, ...schoolProviders],
  controllers: [SchoolController],
})
export class SchoolModule {}
