/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fileTable')
export class FileToFolder {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fieldname: string;
  @Column()
  encoding: string;
  @Column()
  mimetype: string;
  @Column()
  originalname: string;
  @Column()
  destination: number;
  @Column()
  filename: number;
  @Column()
  path: number;
  @Column()
  size: number;
}