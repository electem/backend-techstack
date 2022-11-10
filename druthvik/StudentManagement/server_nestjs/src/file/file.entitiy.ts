import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from '../teacher/teacher.entity';
import { Student } from '../student/student.entity';

@Entity()
export class Files {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fieldname: string;

  @Column()
  originalname: string;

  @Column()
  encoding: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column({
    type: 'bytea',

    nullable: false,
  })
  buffer?: Uint8Array;

  @OneToOne(() => Teacher, (teacher) => teacher.file)
  teacher: Teacher;

  @OneToOne(() => Student, (student) => student.file)
  student: Student;
}
