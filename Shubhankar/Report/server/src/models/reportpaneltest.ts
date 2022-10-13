import {
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
 } from "typeorm";
import { Report } from "./report";

  
  export class Reportpaneltest {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    data?: string;
    @Column()
    panel_id?: number;
    @Column()
    test_id?:number;
    @Column()
    report_id?:number;
     
    @ManyToOne(_type => Report, (report: Report) => report.reportpaneltest)
    @JoinColumn()
    report_data!: Report[];
  }

  

   
    
  


