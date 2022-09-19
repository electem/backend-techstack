import { Get, Route, Tags } from 'tsoa';
import { QueryTypes } from 'sequelize';
import { sequelizeConfig } from '../config/seq.config';

@Route('reportpaneltests')
@Tags('ReportPanelTest')
export default class ReportPanelTestController {
  @Get('/')
  public async getReportpaneltest(): Promise<void> {
    const tableName = 'report_panel_test';
    const query = `SELECT * FROM ${tableName}`;
    console.log(query);
    const data = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT,
    });
  }
}
