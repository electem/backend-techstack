import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from './test';

@Entity()
export class Panel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToMany(() => Test, (test: Test) => test.panel, {
    cascade: true,
  })
  @JoinTable()
  test!: Test[];
}
