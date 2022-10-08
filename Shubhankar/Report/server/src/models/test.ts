import {
Entity,
PrimaryGeneratedColumn,
Column,
ManyToMany,
} from "typeorm";
import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Panel } from "./panel";
@Entity()
@JsonObject()
export class Test {
@PrimaryGeneratedColumn()
@JsonProperty()
id!: number;

@Column()
@JsonProperty()
name?: string;

@ManyToMany(() => Panel, (panel) => panel.tests)
panels!: Panel[];
}