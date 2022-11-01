import {
  getTutorial,
  getTutorialById,
  createTutorial,
  updateTutorial,
} from '../repositories/tutorial.repository';
import { Get, Route, Tags, Post, Body, Path, Delete, Put } from 'tsoa';
import { Tutorial } from '../models';

import { ITutorialPayload } from '../repositories/tutorial.repository';

@Route('tutorials')
@Tags('Tutorial')
export default class TutorialController {
  @Get('/')
  public async getTutorial(): Promise<Array<Tutorial>> {
    return getTutorial();
  }

  @Post('/')
  public async createTutorial(
    @Body() body: ITutorialPayload,
  ): Promise<Tutorial> {
    return createTutorial(body);
  }

  @Get('/:id')
  public async getTutorialByID(@Path() id: string): Promise<Tutorial | null> {
    return getTutorialById(Number(id));
  }

  @Delete('/:id')
  public async getTutorialDeleteByID(
    @Path() id: string,
  ): Promise<Tutorial | string> {
    return getTutorialById(Number(id));
  }
  @Put('/')
  public async updateTutorial(
    @Body() body: ITutorialPayload,
  ): Promise<Tutorial> {
    return updateTutorial(body);
  }
}
