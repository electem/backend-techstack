import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { Test } from './test';

@Entity()
@JsonObject()
export class Panel {
  @PrimaryGeneratedColumn()
  @JsonProperty()
  id!: number;

  @Column()
  @JsonProperty()
  name!: string;

  @Column()
  @JsonProperty()
  description!: string;

  @JsonProperty()
  @ManyToMany(() => Test, (test: Test) => test.panel, {
    cascade: true,
  })
  @JoinTable()
  test!: Test[];
}
