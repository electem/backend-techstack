import { getManager, getRepository } from "typeorm";
import { Panel } from "../models/panels";
export interface IPanelPayload {
  name: string;
  description: string;
}

// export const createPanel = async (payload: IPanelPayload): Promise<Panel> => {
//   const panelRepository = getRepository(Panel);
//   const panel = new Panel();
//   return panelRepository.save({
//     ...panel,
//     ...payload,
//   });
// };

export const updatePanel = async (payload: IPanelPayload): Promise<Panel> => {
  const panelRepository = getRepository(Panel);
  const panel = new Panel();
  return panelRepository.save({
    ...panel,
    ...payload,
  });
};

// query builder query to get all the panels with their tests
export const getPanels = async (): Promise<Array<Panel>> => {
  const entityManager = getManager();
  let panels = [];
  const query = entityManager.createQueryBuilder(Panel, "panels");
  panels = await query
    .select(["panels", "tests"])
    .leftJoinAndSelect("panels.tests", "tests")
    .getMany();
  return panels;
};

// query builder query to get panel by id with their associations
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

export const createPanelMap = async (
  map: Map<string, string>
): Promise<Panel> => {
  const panelRepository = getRepository(Panel);
  const map1 = new Map(Object.entries(map));
  console.log(map1);
  const panel = new Panel();
  console.log(" " + map1);
  panel.name = map1.get("name");
  panel.description = map1.get("description");
  return panelRepository.save(panel);
};
