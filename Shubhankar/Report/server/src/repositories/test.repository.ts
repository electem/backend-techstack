import { Panel } from "../models";
import { getRepository } from "typeorm";
import { JsonSerializer } from "typescript-json-serializer";
import { Test } from "../models/test";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
export interface ITestPayload {
  name: string;
}
export interface IPanelsPayload {
  name: string;
  description: string;
}

export const getTests = async (): Promise<Array<Test>> => {
  const testRepository = getRepository(Test);
  return testRepository.find();
};

export const createJson = async (payload: IPanelsPayload): Promise<Panel> => {
  const panelRepository = getRepository(Panel);
  const defaultSerializer = new JsonSerializer();
  const panel = new Panel();
  const json = defaultSerializer.serialize(panel);
  return panelRepository.save({
    ...json,
    ...payload,
  });
};