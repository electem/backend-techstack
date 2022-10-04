import TutorialsController from '../controllers/totorials.controller'
import * as tutorialsRepository from '../repositories/tutorials.repository'
import {generateTutorialData, generateTutorialsData, generateTutorialPayload} from '../../test/utils/generate'

afterEach(() => {
    jest.resetAllMocks()
  })
  
  describe("TutorialsController", () => {
    describe("getTuorials", () => {
      test("should return empty array", async () => {
        const spy = jest.spyOn( tutorialsRepository, 'getTutorials').mockResolvedValueOnce([])
        const controller = new TutorialsController();
        const tutorials = await controller.getTutorials();
        expect(tutorials).toEqual([])
        expect(spy).toHaveBeenCalledWith()
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })

    test("should return Tuorials list", async () => {
        const tutorialsData = generateTutorialsData(2)
        const spy = jest.spyOn(tutorialsRepository, 'getTutorials').mockResolvedValueOnce(tutorialsData)
        const controller = new TutorialsController();
        const comments = await controller.getTutorials();
        expect(comments).toEqual(tutorialsData)
        expect(spy).toHaveBeenCalledWith()
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })

    describe("createtutorial", () => {
        test("should add tutorial to the database", async () => {
          const payload = generateTutorialPayload()
          const tutorialsData = generateTutorialData(payload)
          const spy = jest.spyOn(tutorialsRepository, 'createTutorial').mockResolvedValueOnce(tutorialsData)
          const controller = new TutorialsController();
          const comment = await controller.createTutorial(payload);
          expect(comment).toMatchObject(payload)
          expect(comment).toEqual(tutorialsData)
          expect(spy).toHaveBeenCalledWith(payload)
          expect(spy).toHaveBeenCalledTimes(1)
        })
      })
    

