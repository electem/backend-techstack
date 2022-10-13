import { Student } from './student';
import { Mark } from './mark';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  semester: string;

  @Column({ nullable: true })
  studentId: number;
  @ManyToOne((_type) => Student, (student: Student) => student.subject)
  @JoinColumn()
  student: Student;

  @OneToOne((_type) => Mark, (mark) => mark.subject)
  mark: Mark;
}
