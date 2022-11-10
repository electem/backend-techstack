import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Teacher } from 'src/teacher/teacher.entity';
import { Student } from 'src/student/student.entity';
@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => Teacher, (teacher) => teacher.school, {
    cascade: true,
  })
  @JoinTable()
  teacher!: Teacher[];

  @OneToMany((_type) => Student, (student: Student) => student.school)
  student!: Array<Student>;
}