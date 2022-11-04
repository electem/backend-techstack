import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [],
  controllers: [FileController],
})
export class FileModule {}
