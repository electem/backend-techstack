import * as TutorialRepository from '../repositories/tutorial.repository';
import { getRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import {
  generateTutorialData,
  generateTutorialDatas,
} from 'test/utils/generate';

jest.mock('typeorm');
const mockedGetRepo = mocked(getRepository(<jest.Mock>{}));
beforeEach(() => {
  mockedGetRepo.find.mockClear();
  mockedGetRepo.findOne.mockClear();
  mockedGetRepo.save.mockClear();
});

describe('TutoiralRepository', () => {
  describe('getTutorial', () => {
    test('should return empty array', async () => {
      mockedGetRepo.find.mockResolvedValue([]);
      const comments = await TutorialRepository.getTutorial();
      expect(comments).toEqual([]);
      expect(mockedGetRepo.find).toHaveBeenCalledWith();
      expect(mockedGetRepo.find).toBeCalledTimes(1);
    });
  });
  test('should return comment list', async () => {
    const tutorialdata = generateTutorialDatas(2);
    mockedGetRepo.find.mockResolvedValue(tutorialdata);
    const tutorials = await TutorialRepository.getTutorial();
    expect(tutorials).toEqual(tutorialdata);
    expect(mockedGetRepo.find).toBeCalledWith();
    expect(mockedGetRepo.find).toBeCalledTimes(1);
  });
});
