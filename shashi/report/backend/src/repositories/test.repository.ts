import { Panel } from "../models";
import { getRepository } from "typeorm";
import { Test } from "../models/test";
import { IPanelPayload } from "./panel.repository";
export interface ITestPayload {
  name: string;
}
export const getTests = async (): Promise<Array<Test>> => {
  const testRepository = getRepository(Test);
  return testRepository.find(relations);
};
export const createJsonData = async (
  payload: IPanelPayload
): Promise<Panel> => {
  const panelRepository = getRepository(Panel);
  const panel = new Panel();
  return panelRepository.save({
    ...panel,
    ...payload,
  });
};
