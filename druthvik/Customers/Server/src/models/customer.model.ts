import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { customerGroup } from './customergroup.model';

@Entity()
export class customerModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('varchar', { length: 10 })
  phonenumber!: number;

  @Column()
  address!: string;

  @Column({ nullable: true })
  status?: string;

  @ManyToOne(
    (_type) => customerGroup,
    (customerGroup: customerGroup) => customerGroup.customer,
  )
  customerGroup!: customerGroup;
}
