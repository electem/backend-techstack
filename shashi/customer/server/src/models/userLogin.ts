import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class UserRegistration {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @Column({ type: "varchar", length: 10 })
  phonenumber?: number;
}
