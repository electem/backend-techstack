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

  @Column()
  phonenumber: number;

  @Column({ type: 'date' })
  dob: Date;

  @OneToOne(() => School, (school) => school.students)
  @JoinColumn()
  school: School;
}
