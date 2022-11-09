/* eslint-disable prettier/prettier */
import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToMany(() => Teacher, (teacher) => teacher.schools, {
    cascade: true,
  })
  @JoinTable()
  teachers!: Teacher[];

  @OneToMany(() => Student, (student) => student.school)
  students: Student[];
}
