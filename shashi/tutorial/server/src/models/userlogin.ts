import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Userlogin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userName?: string;

  @Column()
  password?: string;

  @Column()
  role?: string;
}
