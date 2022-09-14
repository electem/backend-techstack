import { getManager, getRepository } from "typeorm";
import { Panel } from "../models/panel"
export interface IPanelPayload {
  name: string;
  description: string;
}

export const createPanel = async (payload: IPanelPayload): Promise<Panel> => {
  const panelRepository = getRepository(Panel);
  const panel = new Panel();
  return panelRepository.save({
    ...panel,
    ...payload,
  });
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
  const query = entityManager.createQueryBuilder(Panel, "panels");
  tests = await query
    .select(["panels", "tests"])
    .leftJoinAndSelect("panels.tests", "tests")
    .getMany();
  return tests;
};

//query builder query to get panel by id with their associations
export const getPanel = async (id: number) => {
  const entityManager = getManager();
  const query = entityManager.createQueryBuilder(Panel, "panels");
  let panelquery = await query
    .select(["panels", "tests"])
    .leftJoinAndSelect("panels.tests", "tests")
    .where("panels.id = :id", { id: id })
    .getOne();
  return panelquery;
};