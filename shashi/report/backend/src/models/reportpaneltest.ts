import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class Reportpaneltest {
  id?: number;
  data?: string;
  panel_fk?: number;
  test_fk?: number;
  report_fk?: number;
  // constructor(
  //   public id: number,
  //   data: string,
  //   panel_fk: number,
  //   test_fk: number,
  //   report_fk: number
  // ) {
  //   this.id = id;
  //   this.data = data;
  //   this.panel_fk = panel_fk;
  //   this.test_fk = test_fk;
  //   this.report_fk = report_fk;
  // }
}
