/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { School } from 'src/school/school.entity';
import { Image } from 'src/fileupload-Download/file.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentname: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column({ nullable: true })
  phonenumber: number;

  @Column({ nullable: true })
  dob?: Date;

  @OneToOne(() => School, { cascade: true })
  @JoinColumn()
  school: School;

  @OneToOne(() => Image, (image) => image.students)
  @JoinColumn()
  image: Image;
}
