/* eslint-disable prettier/prettier */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { TaskEntity } from './task.entity';


@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false }) name: string;
  @Column({ type: 'text', nullable: true }) description?: string;
  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;

  @ManyToOne(type => UserEntity)
  owner?: UserEntity;

  @OneToMany(type => TaskEntity, task => task.todo)
  tasks?: TaskEntity[];
}