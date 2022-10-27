/* eslint-disable prettier/prettier */
//import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Company } from 'src/company/company.model';

import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departmentname!: string;

  @Column()
  type?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany((_type) => Company, (company) => company.department)
  company!: Company[];
}
