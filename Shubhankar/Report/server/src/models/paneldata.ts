import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
      } from "typeorm";
import { Testdata } from "./testdata";
  
    @Entity()
    export class PanelData {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    name?: string;

    @ManyToMany(() => Testdata, (test_data) => test_data.panel_data,{
        cascade: true,
    })
    @JoinTable()
    test_data!: Testdata[]

}