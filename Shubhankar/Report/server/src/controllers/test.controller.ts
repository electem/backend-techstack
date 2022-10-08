import { Panel } from "../models/panel";
import { Get, Route, Tags, Post, Body, Path, Put } from "tsoa";
import { Test } from "../models/test";
import { getTests } from "../repositories/test.repository";
import { JsonSerializer } from "typescript-json-serializer";
import { writeFileSync } from "fs";
import { join } from "path";

@Route("tests")
@Tags("tests")
export default class TestController {

  public async getTests(): Promise<Array<Test>> {
    return getTests();
  }
  
  // public async getTests(): Promise<Panel> {
  //   const defaultSerializer = new JsonSerializer();
  //   const response = await fetch("http://localhost:8000/panels", {});
  //   const data = await response.json();
  //   console.log("panel Details are " + JSON.stringify(data));
  //    const model = defaultSerializer.deserialize(testrecord, data);
  //    return model as Panel;
  // }

  @Post("/")
  public async createPanel(@Body() panel: Panel) {
    const defaultSerializer = new JsonSerializer();
    const response = defaultSerializer.serialize(panel);
     const json = JSON.stringify(response);
     console.log(json)
     this.syncWriteFile(json)
  }
  public syncWriteFile(json: any) {
    writeFileSync(join(__dirname, "file.txt"), json, {});
  }
}

