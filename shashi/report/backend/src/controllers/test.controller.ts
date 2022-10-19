import { Body, Get, Post, Route, Tags } from "tsoa";
import fetch from "node-fetch";
import { JsonSerializer } from "typescript-json-serializer";
import { Panel } from "../models";
import { writeFileSync } from "fs";
import { join } from "path";

@Route("tests")
@Tags("test")
export default class TestController {
  @Get("/")
  public async getTests(): Promise<Panel> {
    const defaultSerializer = new JsonSerializer();
    const response = await fetch("http://localhost:8000/panel", {});
    const paneldata = await response.json();
    const jsondata = defaultSerializer.deserialize(paneldata, Panel);
    console.log(jsondata);
    return jsondata as Panel;
  }

  @Post("/")
  public async createJsonData(@Body() panel: Panel): Promise<String> {
    const defaultSerializer = new JsonSerializer();
    const panelsdata = defaultSerializer.serialize(panel);
    const strPanel = JSON.stringify(panelsdata);
    this.syncWriteFile(strPanel);
    return "panel data is created";
  }
  private syncWriteFile(fileData: string) {
    writeFileSync(join(__dirname, "paneljson.txt"), fileData, {
      flag: "w",
    });
  }
}