import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Post } from './post';
import { User } from './user';
import { Tutorial } from './tutorial';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text',
  })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  createdAtStr: string;

  // @Column({ nullable: true })
  // userId!: number;
  // @ManyToOne((_type) => User, (user: User) => user.comments)
  // @JoinColumn()
  // user!: User;

  // @Column({ nullable: true })
  // postId!: number;
  // @ManyToOne((_type) => Post, (post: Post) => post.comments)
  // @JoinColumn()
  // post!: Post;
  @Column({ nullable: true })
  tutorialId!: number;
  @ManyToOne((_type) => Tutorial, (tutorial: Tutorial) => tutorial.comments)
  @JoinColumn()
  tutorial!: Tutorial;
  comment: any;
}
