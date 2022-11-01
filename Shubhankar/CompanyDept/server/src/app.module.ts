/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Company } from './company/company.entity';
import { CompanyModule } from './company/company.module';
import { Department } from './department/department.entity';
import { DepartmentModule } from './department/department.module';


@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'cybis@ban',
    database: 'nestjs',
    entities: [Company,Department],
    synchronize: true,
  }),
      CompanyModule,DepartmentModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
