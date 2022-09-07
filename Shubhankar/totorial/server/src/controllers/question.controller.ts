import { Get, Route, Tags,  Post, Body, Path, Query} from "tsoa";
import {Question} from '../models'
import { Req } from "@nestjs/common";
import { QuestionRepository, IQuestionPayload } from "../repositories/question.repository";
//import { Request } from "express";
import { Inject } from "typescript-ioc";


@Route("questions")
@Tags("question")
export class QuestionController {
  @Inject
  private questionRepository!: QuestionRepository;
  service: any;
  

  @Post("/")
  public async createQuestion(@Body() body: IQuestionPayload): Promise<Question> {
    return this.questionRepository.createQuestion(body)
  }

    
}
