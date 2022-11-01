/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './department/department.module';
import { Company } from './company/company.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { Department } from './department/department.entity';
import { AuthModule } from './Auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entity/user.entity';
import { TodoEntity } from './todo/entity/todo.entity';
import { TaskEntity } from './todo/entity/task.entity';
import { FileController } from './fileupload-Download/file.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'company2',
      entities: [Company, Department, UserEntity, TodoEntity, TaskEntity],
      synchronize: true,
    }),
    CompanyModule,
    DepartmentModule,
    AuthModule,
    TodoModule,
    UsersModule,
  ],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule {}
