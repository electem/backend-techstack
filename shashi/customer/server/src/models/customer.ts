import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  customername?: string;

  @Column()
  status?: string;

  @Column()
  street?: string;

  @Column()
  postalcode?: string;

  @Column({ type: "varchar", length: 10 })
  phonenumber?: number;

  @CreateDateColumn()
  createdat!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
