/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Company } from './company/company.entity';
import { CompanyModule } from './company/company.module';
import { Department } from './department/department.entity';
import { DepartmentModule } from './department/department.module';
import { ImageModule } from './fileupload/file.module';
import { TaskEntity } from './ToDo/task.entity';
import { TodoEntity } from './ToDo/toDo.entity';
import { TodoModule } from './ToDo/toDo.module';
import { UserEntity } from './user/user.entity';
import { UsersModule } from './user/user.module';
import { Image} from './fileupload/file.entity'

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'cybis@ban',
    database: 'nestjs',
    entities: [Company,Department,UserEntity,TodoEntity,TaskEntity,Image],
    synchronize: true,
  }),
      CompanyModule,DepartmentModule,AuthModule,UsersModule, TodoModule,ImageModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
