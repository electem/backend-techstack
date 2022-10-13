import { getRepository } from "typeorm";
import { Report } from "../models/report";


export interface IReportPayload {
  name: string;
}

export const createReport = async (payload: IReportPayload): Promise<Report> => {
  const ReportRepository = getRepository(Report);
  const report = new Report();
  return ReportRepository.save({
    ...report,
    ...payload,
  });
};

export const getReports = async (): Promise<Array<Report>> => {
  const ReportRepository = getRepository(Report);
  return ReportRepository.find();
};