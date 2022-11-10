/* eslint-disable prettier/prettier */
import { School } from 'src/school/school.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Student {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    studentname: string;
  
    @Column()
    address: string;
  
    @Column()
    phonenumber: string;

    @Column()
    email: string;

    @Column()
    gender: string;

    @Column()
    dateofbirth?: Date;

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => School, { cascade: true }) 
    @JoinColumn()
    school: School
  }
  