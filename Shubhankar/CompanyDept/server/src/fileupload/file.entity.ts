/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
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
  size: number;
  @Column({
    type: 'bytea',
    nullable: false,
  })
  buffer?: Uint8Array;
}