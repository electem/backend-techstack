import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './file.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Files])],
  providers: [],
  controllers: [FileController],
})
export class FileModule {}
