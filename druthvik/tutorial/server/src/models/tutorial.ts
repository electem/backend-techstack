import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category';
import { Comment } from './comment';

@Entity()
export class Tutorial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title?: string;

  @Column()
  description?: string;

  @Column()
  published?: boolean;

  @Column({ nullable: true })
  timeZone?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  @ManyToMany(() => Category, (categories) => categories.tutorials, {
    cascade: true,
  })
  @JoinTable()
  categories!: Category[];

  @OneToMany((_type) => Comment, (comment: Comment) => comment.tutorial)
  comments!: Comment[];
}
