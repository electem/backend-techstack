/* eslint-disable prettier/prettier */
import { Department } from 'src/department/department.entity';

import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyname?: string;

  @Column()
  address?: string;
  @CreateDateColumn()
  createdAt!: Date;
  @ManyToMany(() => Department, (department) => department.company, {
    cascade: true,
  })  
  @JoinTable()
  department!: Department[];
}
