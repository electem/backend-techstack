import { Get, Route, Tags,  Post, Body, Path, Put } from "tsoa";
import {Tutorials} from '../models'
import {createTutorial, getTutorial, getTutorials, updateTutorial} from '../repositories/tutorials.repository'

@Route("tutorials")
@Tags("Tutorials")
export default class TutorialsController {
  
  @Post("/")
  public async createTutorial(@Body() body: any):    Promise<Tutorials> {
    return createTutorial(body)
  } 

   @Get("/")
  public async getTutorials(): Promise<Array<Tutorials>> {
    return getTutorials()
  }
  //   @Get("/:id")
  // public async getTutorial(@Path() id: string): Promise<Tutorials | null> {
  //   return getTutorial(Number(id))
  // }

  @Get("/:id")
  public async getTutorial(@Path() id: string) {
    return getTutorial(Number(id))
  }
  @Put("/")
  public async updateTutorial(@Body() body: any): Promise<Tutorials> {
    return updateTutorial(body)
  } 
}
