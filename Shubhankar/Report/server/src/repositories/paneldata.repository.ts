import {getManager, getRepository} from "typeorm";
import { PanelData } from '../models/paneldata'
export interface IPanelDataPayload {
  name: string;
}

export const createPanelData  = async (payload: IPanelDataPayload) :Promise<PanelData> => {
  const gamesRepository = getRepository(PanelData);
  const panelData = new PanelData()
  return gamesRepository.save({
  ...panelData,
  ...payload
    })
  }
  export const getPanelData = async (): Promise<Array<PanelData>> => {
    const entityManager = getManager();
    let testdata = [];
    const query = entityManager.createQueryBuilder(PanelData, "paneldata");
    testdata = await query
      .select(["paneldata", "testdata"])
      .leftJoinAndSelect("paneldata.testdata", "testdata")
      .getMany();
    return testdata;
  };