import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserRegister {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column('varchar', { length: 10 })
  phonenumber!: number;
}
