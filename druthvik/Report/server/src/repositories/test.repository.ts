import { getRepository } from 'typeorm';
import { Test } from '../models/test';

export interface ITestPayload {
  name: string;
}

export const getTests = async (): Promise<Array<Test>> => {
  const testRepository = getRepository(Test);
  return testRepository.find();
};
