import { getManager, getRepository } from 'typeorm';
import { Panel } from '../models/panel';

export class IPanelPayload {
  name: string;
  description: string;
}

export const createPanel = async (map: Map<string, string>): Promise<Panel> => {
  const panelRepository = getRepository(Panel);
  const objectToMap = new Map(Object.entries(map));
  const panel = new Panel();
  panel.name = objectToMap.get('name');
  panel.description = objectToMap.get('description');
  return panelRepository.save(panel);
};

export const updatePanel = async (payload: IPanelPayload): Promise<Panel> => {
  const panelRepository = getRepository(Panel);
  const panel = new Panel();
  return panelRepository.save({
    ...panel,
    ...payload,
  });
};

// This is block of code is use to get all the panels and its associated tests using Querybuilder.
export const getPanels = async (): Promise<Array<Panel>> => {
  const entityManager = getManager();
  let tests = [];
  const query = entityManager.createQueryBuilder(Panel, 'panel');
  tests = await query
    .select(['panel', 'test'])
    .leftJoinAndSelect('panel.test', 'test')
    .getMany();
  return tests;
};

// This is block of code is use to get single panel by id and its associated tests using Querybuilder.
export const getPanel = async (id: number) => {
  const entityManager = getManager();
  const query = entityManager.createQueryBuilder(Panel, 'panel');
  const panelquery = await query
    .select(['panel', 'test'])
    .leftJoinAndSelect('panel.test', 'test')
    .where('panel.id = :id', { id: id })
    .getOne();
  return panelquery;
};
