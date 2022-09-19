import { Req } from "@nestjs/common";
import { query, response } from "express";
import { QueryTypes } from "sequelize";
import { sequelizeConfig } from "../config/seq.config";

import { Get, Route, Tags, Post, Body, Path, Put, Res } from "tsoa";
import { getManager } from "typeorm";
import { Reportpaneltest } from "../models/reportpaneltest";

import {
  //createReportpaneltest,
  IReportpaneltestPayload,
  //getReportpaneltest,
} from "../repositories/reportpaneltest.repository";

@Route("reportpaneltests")
@Tags("reportpaneltest")
export default class ReportpaneltestController {
  @Get("/")
  public async getReportpaneltest(): Promise<void> {
    var tableName = "report_panel_test";
    let query = `SELECT * FROM ${tableName}`;
    console.log(query);
    const data = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT,
    });
    //return data;
  }
}
