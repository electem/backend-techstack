/** @format */

import { Route, Tags, Post, Body, Get } from "tsoa";
import {
  createReportpaneltest,
  getReportpaneltest,
  IReportpaneltestPayload,
} from "../repositories/reportpaneltest.repository";
import {
  createConnection,
  getConnection,
  getManager,
  getRepository,
} from "typeorm";
import { Reportpaneltest } from "../models/reportpaneltest";
import { query } from "express";
import { Req, Res } from "@nestjs/common";
import { sequelizeConfig } from "../config/seq.config";
import { QueryTypes } from "sequelize";

@Route("reportpaneltest")
@Tags("reportpaneltest")
export default class ReportPaneltestController {
  myMap = new Map();

  @Post("/")
  public async createReportpaneltest(@Body() body: IReportpaneltestPayload) {
    console.log(body);
    const createReportpaneltest = createConnection()
      .then(async (_connection) => {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into("Reportpaneltest")
          .values({
            id: 10,
            data: "sample",
            panel_id: 1,
            test_id: 1,
            report_id: 1,
          })
          .execute();
      })
      .catch((error) => console.log(error));
    return "Hello";
  }

  @Get("/")
  public async getReportpaneltest(): Promise<any> {
    var tableName = "report_panel_test";
    let query = `SELECT * FROM ${tableName}`;
    console.log(query);
    const data = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT,
    });
    for (let map of data) {
      console.log(map.panel_id);
    }
    return data;
  }
}
