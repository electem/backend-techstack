import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tutorial } from './tutorial';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title?: string;

  @ManyToMany((_type) => Tutorial, (tutorial) => tutorial.categories)
  tutorials!: Tutorial[];
}
