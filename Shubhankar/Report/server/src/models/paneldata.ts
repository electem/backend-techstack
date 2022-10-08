import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
      } from "typeorm";
import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Testdata } from "./testdata";
  
    @Entity()
    @JsonObject()
    export class PanelData {
    @PrimaryGeneratedColumn()
    @JsonProperty()
    id!: number;
  
    @Column()
    @JsonProperty()
    name?: string;

    @ManyToMany(() => Testdata, (test_data) => test_data.panel_data,{
    cascade: true,
    })
    @JoinTable()
    @JsonProperty()
    test_data!: Testdata[]

}