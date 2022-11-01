import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { customerModel } from './customer.model';

@Entity()
export class customerGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(
    () => customerModel,
    (customergroup) => customergroup.customergroup,
    {
      cascade: true,
    },
  )
  @JoinTable()
  customers!: customerModel[];
}
