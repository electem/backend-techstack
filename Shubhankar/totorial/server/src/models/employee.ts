import {Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn} from "typeorm";
import { Company } from "./company";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({
    type: 'text'
    })
    content!: string;

    @Column({ nullable: true })
    companyid!: number;
    @ManyToOne(_type => Company, (company: Company) => company.employees)
    @JoinColumn()
    company!: Company;
}