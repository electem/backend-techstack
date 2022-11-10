/* eslint-disable prettier/prettier */
import { School } from 'src/school/school.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teachername: string;

  @Column()
  address: string;

  @Column()
  phonenumber: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany((_type) => School, (school) => school.teachers)
  schools!: School[];
}
