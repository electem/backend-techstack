/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Company } from './company/company.entity';
import { CompanyModule } from './company/company.module';
import { Department } from './department/department.entity';
import { DepartmentModule } from './department/department.module';
import { User } from './user/user.entity';
import { UsersModule } from './user/user.module';
import { UsersService } from './user/user.service';


@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'cybis@ban',
    database: 'nestjs',
    entities: [Company,Department,User],
    synchronize: true,
  }),
      CompanyModule,DepartmentModule,AuthModule,UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
