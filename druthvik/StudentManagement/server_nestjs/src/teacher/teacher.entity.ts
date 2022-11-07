import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { School } from 'src/school/school.entity';
@Entity()
export class Teacher {
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

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany((_type) => School, (school) => school.teacher)
  school!: School[];
}
