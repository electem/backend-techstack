import { QueryTypes } from "sequelize";
import { sequelizeConfig } from "../config/seq.config";
import { Get, Route, Tags } from "tsoa";
import { Reportpaneltest } from "../models/reportpaneltest";

@Route("reportpaneltests")
@Tags("reportpaneltest")
export default class ReportpaneltestController {
  @Get("/")
  public async getReportpaneltest(): Promise<Map<String, String>> {
    var tableName = "report_panel_test";
    let query = `SELECT * FROM ${tableName}`;
    console.log(query);
    const tableData = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT,
    });
    const map = new Map();
    for (let reportPanel of tableData) {
      const recordReportPanelTest = reportPanel as Reportpaneltest;
      map.set(
        recordReportPanelTest.panel_fk + "_" + recordReportPanelTest.test_fk,
        recordReportPanelTest.data
      );
    }
    const mapObject = Object.fromEntries(map);
    return mapObject;
  }
}
