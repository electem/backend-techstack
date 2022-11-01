import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
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

  @ManyToMany(
    (_type) => customerGroup,
    (customergroup) => customergroup.customers,
  )
  customergroup!: customerGroup[];
}
