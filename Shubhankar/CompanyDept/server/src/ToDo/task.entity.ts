/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
import { TodoEntity } from './toDo.entity';
  
  
  @Entity('task')
  export class TaskEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ type: 'varchar', nullable: false }) name: string;
    @CreateDateColumn() createdOn?: Date;
  
    @ManyToOne((type) => TodoEntity, (todo) => todo.tasks)
    todo?: TodoEntity;
  }