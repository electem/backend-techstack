import {getRepository} from "typeorm";
import {Testdata} from "../models/testdata"

export interface ITestdataPayload {
  value: string;
 }

export const createTestData  = async (payload: ITestdataPayload) :Promise<Testdata> => {
  const playerRepository = getRepository(Testdata);
  const testdata = new Testdata()
  return playerRepository.save({
    ...testdata,
    ...payload
  })
}