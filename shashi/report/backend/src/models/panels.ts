import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Test } from "./test";
@Entity()
@JsonObject()
export class Panel {
  @PrimaryGeneratedColumn()
  @JsonProperty()
  id!: number;

  @Column()
  @JsonProperty()
  name?: string;

  @Column()
  @JsonProperty()
  description?: string;

  @ManyToMany((_type) => Test, (test) => test.panels, {
    cascade: true,
  })
  @JoinTable()
  @JsonProperty()
  tests!: Test[];
}
