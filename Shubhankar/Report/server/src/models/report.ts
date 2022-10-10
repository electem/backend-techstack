import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reportpaneltest } from "./reportpaneltest";

export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(
    (_type) => Reportpaneltest,
    (reportpaneltest: Reportpaneltest) => reportpaneltest.report_data
  )
  reportpaneltest!: Array<Reportpaneltest>;
}
