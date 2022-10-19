import { Get, Route, Tags, Post, Body, Path, Put, Delete } from "tsoa";
import { Tutorial } from "../models/tutorials";
import {
  getTutorials,
  createTutorial,
  ITutorialPayload,
  getTutorial,
  updateTutorial,
  //deleteTutorial,
} from "../repositories/tutorials.repository";

@Route("tutorials")
@Tags("tutorial")
export default class TutorialController {
  @Get("/")
  public async getTutorials(): Promise<Array<Tutorial>> {
    return getTutorials();
  }

  @Post("/")
  public async createTutorial(
    @Body() body: ITutorialPayload
  ): Promise<Tutorial> {
    return createTutorial(body);
  }

  @Get("/:id")
  public async getTutorial(@Path() id: string) {
    return getTutorial(Number(id));
  }

  @Put("/")
  public async updateTutorial(
    @Body() body: ITutorialPayload
  ): Promise<Tutorial> {
    return updateTutorial(body);
  }

}
