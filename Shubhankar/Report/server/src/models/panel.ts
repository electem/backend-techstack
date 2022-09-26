import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinTable,
    ManyToMany,
  } from "typeorm";
 import { Test } from "./test";
  @Entity()
  export class Panel {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    name?: string;
  
    @Column()
    description?: string;
  
    @ManyToMany((_type) => Test, (test) => test.panels, {
      cascade: true,
    })
    @JoinTable()
    tests!: Test[];
   }
  