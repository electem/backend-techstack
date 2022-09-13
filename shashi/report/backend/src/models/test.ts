import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
  } from "typeorm";
  import { Panel } from "./panels";
  @Entity()
  export class Test {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    name?: string;
  
    @ManyToMany(() => Panel, (panel) => panel.tests)
    panels!: Panel[];
  }
  