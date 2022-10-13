import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class LoginUser {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    role!: string;

}