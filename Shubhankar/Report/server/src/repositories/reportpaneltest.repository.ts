import { getRepository } from "typeorm";
import { Reportpaneltest } from "../models/reportpaneltest"

export interface IReportpaneltestPayload {
  data: string;
  panel_id:number;
  test_id:number;
  report_id:number;
}

export const createReportpaneltest = async (payload: IReportpaneltestPayload): Promise<Reportpaneltest> => {
    const ReportpaneltestRepository = getRepository(Reportpaneltest);
    const reportpt = new Reportpaneltest();
    return ReportpaneltestRepository.save({
      ...reportpt,
      ...payload,
    });
  };

  export const getReportpaneltest = async (): Promise<Array<Reportpaneltest>> => {
    const ReportpaneltestRepository = getRepository(Reportpaneltest);
    return ReportpaneltestRepository.find();
  };