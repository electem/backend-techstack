import * as ReportpaneltestRepository from './reportpaneltest.repository'
import {getRepository} from 'typeorm'
import { mocked } from 'ts-jest/utils'
import {generateReportPanelTestData, generateReportPanelTestsData, generateReportPanelTestPayload} from '../../test/utils/generate'

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}))
beforeEach(() => {
  mockedGetRepo.find.mockClear()
  mockedGetRepo.findOne.mockClear()
  mockedGetRepo.save.mockClear()
})

describe("ReportpaneltestRepository", () => {
  describe("getReportpaneltest", () => {
    test("should return empty array", async () => {
      mockedGetRepo.find.mockResolvedValue([])
      const reportpaneltest = await ReportpaneltestRepository.getReportpaneltest();
      expect(reportpaneltest).toEqual([])
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })

    test("should return Reportpaneltest list", async () => {
      const reportpaneltestData = generateReportPanelTestsData(2)
      mockedGetRepo.find.mockResolvedValue(reportpaneltestData)
      const reportpaneltests = await ReportpaneltestRepository.getReportpaneltest();
      expect(reportpaneltests).toEqual(reportpaneltests)
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })
  })
  describe("createReportpaneltest", () => {
    test("should add Reportpaneltest to the database", async () => {
      const payload = generateReportPanelTestPayload()
      const reportpaneltestData = generateReportPanelTestData(payload)
      mockedGetRepo.save.mockResolvedValue(reportpaneltestData)
      const reportpaneltests = await ReportpaneltestRepository.createReportpaneltest(payload);
      expect(reportpaneltests).toMatchObject(payload)
      expect(reportpaneltests).toEqual(reportpaneltestData)
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload)
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1)
    })
  })
})