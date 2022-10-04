import {createQueryBuilder, getRepository} from "typeorm";
import {Question} from '../models'
import { getManager, Connection } from "typeorm";
import { Injectable } from "@nestjs/common";

export interface IQuestionPayload {
  content: string;
  resid: number;
}

@Injectable()
export class QuestionRepository {
constructor(private readonly connection: Connection) {}


public createQuestion  = async (payload: IQuestionPayload) :Promise<Question> => {
  const questionRepository = getRepository(Question);
  const question = new Question()
  return questionRepository.save({
    ...question,
    ...payload
  })
}

}