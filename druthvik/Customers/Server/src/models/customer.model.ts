import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
