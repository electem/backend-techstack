import { Route, Tags, Post, Body } from 'tsoa';
import { Report } from '../models/report';
import {
  createReport,
  IReportPayload,
} from '../repositories/report.repository';

@Route('reports')
@Tags('Report')
export default class ReportController {
  @Post('/')
  public async createReport(@Body() body: IReportPayload): Promise<Report> {
    return createReport(body);
  }
}
