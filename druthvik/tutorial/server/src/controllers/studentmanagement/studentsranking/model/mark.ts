import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from './subject';

@Entity()
export class Mark {
  @PrimaryGeneratedColumn()
  markId: number;

  @Column()
  scoredMarks: number;

  @Column()
  maxMarks: number;

  @Column()
  subjectId: number;
  @OneToOne(() => Subject, { nullable: false })
  @JoinColumn()
  subject: Subject;
}
