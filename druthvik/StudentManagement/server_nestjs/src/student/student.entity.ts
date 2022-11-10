import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { School } from 'src/school/school.entity';
import { Files } from 'src/file/file.entitiy';
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phonenumber: number;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column()
  dateofbirth: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToOne(() => School, { cascade: true })
  @JoinColumn()
  school: School;

  @OneToOne(() => Files, (file) => file.student)
  @JoinColumn()
  file: Files;
}
