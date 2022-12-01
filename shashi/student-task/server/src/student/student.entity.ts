/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { School } from 'src/school/school.entity';
import { Image } from 'src/fileupload-Download/file.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  studentid: number;

  @Column()
  studentname: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  gender: string;

  @Column()
  phonenumber: number;

  @Column()
  dob?: Date;

  @ManyToOne(() => School, (school) => school.students, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  school: School[];

  @OneToOne(() => Image, (image) => image.students, {})
  @JoinColumn()
  image: Image;
}
