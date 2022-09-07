import { getRepository } from 'typeorm';
import { Mark } from './model/mark';

export class IMarkPayload {
  scoredMarks: number;
  maxMarks: number;
  subjectId: number;
}

export const createMark = async (payload: IMarkPayload): Promise<Mark> => {
  const markRepository = getRepository(Mark);
  const mark = new Mark();
  return markRepository.save({
    ...mark,
    ...payload,
  });
};
