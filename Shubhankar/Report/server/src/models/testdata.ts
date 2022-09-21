import {
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
      } from "typeorm";
import { PanelData } from "./paneldata";
  
    @Entity()
    export class Testdata {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    value?: string;
  
   @ManyToMany(() => PanelData, (panel_Data) => panel_Data.test_data)
   panel_data!: PanelData[]
}