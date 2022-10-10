import { getRepository } from 'typeorm';
import { Report } from '../models/report';

export class IReportPayload {
  name = generateString(5);
}

export const createReport = async (
  payload: IReportPayload,
): Promise<Report> => {
  const reportRepository = getRepository(Report);
  const report = new Report();
  return reportRepository.save({
    ...report,
    ...payload,
  });
};

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length: number) {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
