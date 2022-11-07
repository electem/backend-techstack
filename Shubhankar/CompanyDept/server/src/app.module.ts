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
import { TaskEntity } from './ToDo/task.entity';
import { TodoEntity } from './ToDo/toDo.entity';
import { TodoModule } from './ToDo/toDo.module';
import { UserEntity } from './user/user.entity';

import { UsersModule } from './user/user.module';



@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'cybis@ban',
    database: 'nestjs',
    entities: [Company,Department,UserEntity,TodoEntity,TaskEntity],
    synchronize: true,
  }),
      CompanyModule,DepartmentModule,AuthModule,UsersModule, TodoModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
