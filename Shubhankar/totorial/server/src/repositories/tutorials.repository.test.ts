import * as tutorialsRepository from './tutorials.repository'
import {getRepository} from 'typeorm'
import { mocked } from 'ts-jest/utils'
import {generateTutorialData, generateTutorialsData, generateTutorialPayload} from '../../test/utils/generate'


jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}))
beforeEach(() => {
  mockedGetRepo.find.mockClear()
  mockedGetRepo.findOne.mockClear()
  mockedGetRepo.save.mockClear()
})

describe("tutorialRepository", () => {
    describe("getTutorials", () => {
      test("should return empty array", async () => {
        mockedGetRepo.find.mockResolvedValue([])
        const tutorials = await tutorialsRepository.getTutorials();
        expect(tutorials).toEqual([])
        expect(mockedGetRepo.find).toHaveBeenCalledWith()
        expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
      })

      test("should return tutorials list", async () => {
        const tutorialsData = generateTutorialsData(2)
        mockedGetRepo.find.mockResolvedValue(tutorialsData)
        const tutorials = await tutorialsRepository.getTutorials();
        expect(tutorials).toEqual(tutorialsData)
        expect(mockedGetRepo.find).toHaveBeenCalledWith()
        expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
      })

      describe("createtutorial", () => {
        test("should add tutorial to the database", async () => {
          const payload = generateTutorialPayload()
          const tutorialData = generateTutorialData(payload)
          mockedGetRepo.save.mockResolvedValue(tutorialData)
          const tutorial = await tutorialsRepository.createTutorial(payload);
          expect(tutorial).toMatchObject(payload)
          expect(tutorial).toEqual(tutorialData)
          expect(mockedGetRepo.save).toHaveBeenCalledWith(payload)
          expect(mockedGetRepo.save).toHaveBeenCalledTimes(1)
        })
      })

      describe("gettutorial", () => {
        test("should return tutorial from the database", async () => {
          const id = 1
          const tutorialData = generateTutorialData({id})
          mockedGetRepo.findOne.mockResolvedValue(tutorialData)
          const tutorial = await tutorialsRepository.getTutorial(id);
          expect(tutorial).toEqual(tutorialData)
          expect(tutorial?.id).toBe(id)
          expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
          expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
        })
    })
     })

})


