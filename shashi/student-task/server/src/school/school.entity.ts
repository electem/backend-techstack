/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  schoolid: number;

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

  @OneToMany(() => Student, (student) => student.school, {
    onDelete: 'CASCADE',
  })
  students: Student[];
}
