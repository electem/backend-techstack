import {
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
      } from "typeorm";
import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { PanelData } from "./paneldata";
  
    @Entity()
    @JsonObject()
    export class Testdata {
    @PrimaryGeneratedColumn()
    @JsonProperty()
    id!: number;
  
    @Column()
    @JsonProperty()
    value?: string;
  
   @ManyToMany(() => PanelData, (panel_Data) => panel_Data.test_data)
   panel_data!: PanelData[]
}