import { getManager, getRepository } from 'typeorm';
import { Panel } from '../models/panel';

export class IPanelPayload {
  name: string;
  description: string;
}

export const createPanel = async (map: Map<string, string>): Promise<Panel> => {
  const panelRepository = getRepository(Panel);
  const map1 = new Map(Object.entries(map));
  console.log(map1);
  const panel = new Panel();
  console.log(' ' + map1);
  panel.name = map1.get('name');
  panel.description = map1.get('description');
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

//query builder query to get all the panels with their tests

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

//query builder query to get panel by id with their associations

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
