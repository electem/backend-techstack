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