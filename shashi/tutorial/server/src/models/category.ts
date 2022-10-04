import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm";
import { Tutorial } from "./tutorials";
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title?: string;

  @ManyToMany(() => Tutorial, (tutorial) => tutorial.categories)
  tutorials!: Tutorial[];
}
