import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { School } from 'src/school/school.entity';
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

  @Column({ type: 'date' })
  dateofbirth: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToOne(() => School, { cascade: true })
  @JoinColumn()
  school: School;
}
