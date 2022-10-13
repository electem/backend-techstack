import { Route, Tags, Post, Body} from "tsoa";
import { JsonSerializer } from "typescript-json-serializer";
import { Panel } from "../models/panel";
import { writeFileSync } from "fs";
import { join } from "path";
import { Test } from "../models/test";
import { getTests } from "../repositories/test.repository";

@Route("tests")
@Tags("tests")
export default class TestController {

  public async getTests(): Promise<Array<Test>> {
    return getTests();
  }
 
  @Post("/")
  public async createPanel(@Body() panel: Panel) {
    const defaultSerializer = new JsonSerializer();
    const response = defaultSerializer.serialize(panel);
     const json = JSON.stringify(response);
     console.log(json)
     this.syncWriteFile(json)
  }

  public syncWriteFile(json: string) {
    writeFileSync(join(__dirname, "file.txt"), json, {});
  }
}

