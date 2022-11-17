/* eslint-disable prettier/prettier */
import { Image } from 'src/fileupload/file.entity';
import { School } from 'src/school/school.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Student {
    @PrimaryGeneratedColumn()
    studentid: number;
  
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
    createdAt?: Date;

   @ManyToOne(() => School, (school) => school.students)
    school: School

    @OneToOne(() => Image,(image) => image.students) 
    @JoinColumn()
    image?: Image
  }
  