import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Category } from "./category";
import { Comment } from "./comment";
@Entity()
export class Tutorial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title?: string;

  @Column()
  description?: string;

  @Column({ nullable: true })
  timeZone?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany((_type) => Category, (category) => category.tutorials, {
    cascade: true,
  })
  @JoinTable()
  categories!: Category[];

  @OneToMany((_type) => Comment, (comment: Comment) => comment.tutorial)
  comments!: Comment[];
}
