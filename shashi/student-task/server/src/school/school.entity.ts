/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from 'src/teacher/teacher.entity';
import { Student } from 'src/student/student.entity';

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

  @OneToMany((_type) => Student, (student) => student.school)
  students: Student[];
}