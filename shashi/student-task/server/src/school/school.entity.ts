/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from 'src/teacher/teacher.entity';

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schoolname: string;

  @Column()
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Teacher, (teacher) => teacher.school, {
    cascade: true,
  })
  @JoinTable()
  teacher!: Teacher[];
}
