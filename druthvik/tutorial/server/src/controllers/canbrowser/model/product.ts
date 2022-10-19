import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Resources } from '../model/resource';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_type: any) => Resources,
    (resource: Resources) => resource.Product,
  )
  @JoinColumn()
  resource!: Resources;
}
