/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from 'src/department/department.entity';
import { PaginateableBaseEntity } from 'src/pagination';

@Entity()
export class Company extends PaginateableBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @ManyToMany(() => Department, (department) => department.company, {
    cascade: true,
  })
  @JoinTable()
  department!: Department[];
}