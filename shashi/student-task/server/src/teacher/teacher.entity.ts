/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { School } from 'src/school/school.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teachername: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  gender: string;
  @ManyToMany((_type) => School, (school) => school.teacher)
  school!: School[];
}
