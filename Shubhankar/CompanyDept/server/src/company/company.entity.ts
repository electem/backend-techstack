/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from 'src/department/department.entity';


@Entity()
export class Company  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  createdAt: Date;

  @ManyToMany(() => Department, (department) => department.company, {
    cascade: true,
  })
  @JoinTable()
  department!: Department[];
}