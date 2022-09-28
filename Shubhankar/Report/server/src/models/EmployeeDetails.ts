import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { JsonObject, JsonProperty } from "typescript-json-serializer";
     @Entity()
    export class EmployeeDetils {
    @PrimaryGeneratedColumn()
    id?:number;
     @Column()
     name?: string;
    @Column()
    address?: string;
   
    @Column()
    gender?:string;
   
    @Column()
    salary?: number;
    }