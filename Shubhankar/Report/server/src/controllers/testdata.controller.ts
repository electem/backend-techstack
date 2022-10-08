import { Route, Tags,  Post, Body, Get, Path} from "tsoa";
import {Testdata} from '../models/testdata'
import {ITestdataPayload ,createTestData, getTestData } from "../repositories/testdata.repository"
import {JsonSerializer} from "typescript-json-serializer";
import { doctor } from '../json/data'
// import fetch from 'node-fetch';
import { Doctor } from "../models/doctor";

@Route("testdata")
@Tags("testdata")
export class TestDataController {


  @Post("/")
  public async createTestData(@Body() body: ITestdataPayload): Promise<Testdata> {
    return  createTestData(body)
  }

//   @Get("/")
//   public async getTestData(): Promise<Doctor> {
//     const defaultSerializer = new JsonSerializer();
//     const doc = defaultSerializer.deserialize(doctor,Doctor);
//     return doc as Doctor;
//   }
//  }

// new TestDataController().getTestData().then((doc: Doctor) => {
//   console.log(doc);
//   console.log("testData" +JSON.stringify(doctor));
// });

@Get("/")
public async getTestData(): Promise<Array<Testdata>> {
  // const response = await fetch('http://localhost:8000/tests');
  //   const data = await response.json();
  //   console.log("Test Details are "+JSON.stringify(data));
  return getTestData();
}
}


