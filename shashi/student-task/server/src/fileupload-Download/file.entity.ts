/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  TableColumn,
} from 'typeorm';
import { Student } from 'src/student/student.entity';

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
  @OneToOne(() => Student, (student) => student.image)
  students: Student;
}
