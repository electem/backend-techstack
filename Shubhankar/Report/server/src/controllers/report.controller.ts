import { Route, Tags, Post, Body, Get} from "tsoa";
import { Report } from "../models/report";
import {IReportPayload,createReport,getReports} from "../repositories/report.repository"

@Route("reports")
@Tags("reports")
export default class ReportController {
    @Post("/")
    public async createReport(@Body() body: IReportPayload): Promise<Report> {
      return createReport(body);
    }
    @Get("/")
    public async getReports(): Promise<Array<Report>> {
      return getReports();
    }
}

