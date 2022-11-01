import { Route, Tags } from 'tsoa';
import { QueryTypes } from 'sequelize';
import { sequelizeConfig } from '../config/seq.config';
import { ReportPanelTest } from '../models/report_panel_test.model';

const map = new Map();

@Route('reportpaneltests')
@Tags('ReportPanelTest')
export default class ReportPanelTestController {
  public async getReportpaneltest(): Promise<Map<string, string>> {
    const tableName = 'report_panel_test';
    const query = `SELECT * FROM ${tableName}`;
    const data = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT,
    });
    for (const reportPanel of data) {
      const reportpaneltest = reportPanel as ReportPanelTest;
      map.set(
        reportpaneltest.panel_fk + '' + reportpaneltest.test_fk,
        reportpaneltest.data,
      );
    }
    const panel = Object.fromEntries(map);
    return panel;
  }
}
