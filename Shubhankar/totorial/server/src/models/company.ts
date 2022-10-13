import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Employee } from "./employee"
@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column()
    email!: string;

    @OneToMany(_type => Employee, (employee: Employee) => employee.company, {
        cascade: true,
    })
    employees!: Array<Employee>
}
