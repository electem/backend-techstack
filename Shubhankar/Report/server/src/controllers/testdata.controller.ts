import { Route, Tags,Post, Body} from "tsoa";
import {Testdata} from '../models/testdata'
import {ITestdataPayload ,createTestData } from "../repositories/testdata.repository"

@Route("testdata")
@Tags("testdata")
export class TestDataController {

  @Post("/")
  public async createTestData(@Body() body: ITestdataPayload): Promise<Testdata> {
    return  createTestData(body)
  }
}