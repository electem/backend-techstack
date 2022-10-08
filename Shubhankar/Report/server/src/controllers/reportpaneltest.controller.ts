import { Route, Tags,Get} from "tsoa";
import { Reportpaneltest } from "../models/reportpaneltest";
import { sequelizeConfig } from "../config/seq.config";
import { QueryTypes } from "sequelize";

@Route("reportpaneltest")
@Tags("reportpaneltest")
export default class ReportPaneltestController {
  
  @Get("/")
  public async getReportpaneltest(): Promise<Reportpaneltest> {
    const myMap = new Map();
    const tableName = "report_panel_test";
     const query = `SELECT * FROM ${tableName}`;
    console.log(query);
    const reportpaneltest = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT,
    });
    for (const reportpanellistdata of reportpaneltest) {
      const reportpaneltest = reportpanellistdata  as Reportpaneltest;
         myMap.set( 
          reportpaneltest.panel_id+'_'+reportpaneltest.test_id ,reportpaneltest.data
        )
     }
     const mapObject = Object.fromEntries(myMap);
     return mapObject;
  }
}
