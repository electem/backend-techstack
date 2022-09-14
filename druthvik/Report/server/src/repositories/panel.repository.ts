import { getManager, getRepository } from 'typeorm';
import { Panel } from '../models/panel';

export interface IPanelPayload {
  name: string;
  description: string;
}

// export const getPanel = async (): Promise<Array<Panel>> => {
//   const panelRepository = getRepository(Panel);
//   return panelRepository.find();
// };

export const createPanel = async (payload: IPanelPayload): Promise<Panel> => {
  const panelRepository = getRepository(Panel);
  const panel = new Panel();
  return panelRepository.save({
    ...panel,
    ...payload,
  });
};

export const getpanelById = async (id: number): Promise<Panel | null> => {
  const panelRepository = getRepository(Panel);
  const panel = await panelRepository.findOne({ id: id });
  if (!panel) return null;
  return panel;
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
