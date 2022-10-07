import { Body, Get, Post, Route, Tags } from "tsoa";
import fetch from "node-fetch";
import { JsonSerializer } from "typescript-json-serializer";
import { Panel } from "../models";
import { readFileSync, writeFileSync, promises as fsPromises } from "fs";
import { join } from "path";
import * as fs from "fs";

@Route("tests")
@Tags("test")
export default class TestController {
  @Get("/")
  public async getTests(): Promise<Panel> {
    const defaultSerializer = new JsonSerializer();
    const response = await fetch("http://localhost:8000/panel", {}); //http client
    const paneldata = await response.json();
    const jsondata = defaultSerializer.deserialize(paneldata, Panel);
    //console.log(jsondata);
    return jsondata as Panel;
  }
         
  //write a file

  @Post("/")
  public async createJsonData(@Body() panel: Panel): Promise<String> {
    const defaultSerializer = new JsonSerializer();
    const panelsdata = defaultSerializer.serialize(panel);
    const strPanel = JSON.stringify(panelsdata);
    this.syncWriteFile(strPanel);
    return "panel data is created";
  }
  private syncWriteFile(data: string) {
    writeFileSync(join(__dirname, "paneljson.txt"), data, {
      flag: "w",
    });
  }

  //json read file

  // @Get("/")
  // public async getTests(): Promise<JSON> {
  //   const inputFile = "../controllers/employeedetails.json";
  //   const data = fs.readFileSync(join(__dirname, inputFile), "utf-8");
  //   console.log(data);
  //   return data as unknown as JSON;
  // }
}
