import * as PanelRepository from "./panel.repository";
import { getRepository } from "typeorm";
import { mocked } from "ts-jest/utils";
import {
  generatePanelsData,
  generatePanelPayload,
  generatePanelData,
} from "../../test/utils/generate";

jest.mock("typeorm");

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}));
beforeEach(() => {
  mockedGetRepo.find.mockClear();
  mockedGetRepo.findOne.mockClear();
  mockedGetRepo.save.mockClear();
});

describe("PanelRepository", () => {
  describe("getPanels", () => {
    test("should return empty array", async () => {
      mockedGetRepo.find.mockResolvedValue([]);
      const panels = await PanelRepository.getPanels();
      expect(panels).toEqual([]);
      expect(mockedGetRepo.find).toHaveBeenCalledWith();
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
    });
    test("should return panels list", async () => {
      const panelsData = generatePanelsData(3);
      mockedGetRepo.find.mockResolvedValue(panelsData);
      const panels = await PanelRepository.getPanels();
      expect(panels).toEqual(panelsData);
      expect(mockedGetRepo.find).toHaveBeenCalledWith();
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
    });
  });
  describe("addPanel", () => {
    test("should add panel to the database", async () => {
      const payload = generatePanelPayload();
      const panelData = generatePanelData(payload);
      mockedGetRepo.save.mockResolvedValue(panelData);
      const panel = await PanelRepository.createPanel(payload);
      expect(panel).toMatchObject(payload);
      expect(panel).toEqual(panelData);
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload);
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1);
    });
  });

  describe("getTutorial", () => {
    test("should return tutorial from the database", async () => {
      const id = 1;
      const panelData = generatePanelData({ id });
      mockedGetRepo.findOne.mockResolvedValue(panelData);
      const panel = await PanelRepository.getPanel(id);
      expect(panel).toEqual(panelData);
      expect(panel).toBe(id);
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id });
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
    });

    test("should return null if panel not found", async () => {
      const id = 1;
      mockedGetRepo.findOne.mockResolvedValue(null);
      const panel = await PanelRepository.getPanel(id);
      expect(panel).toBeNull();
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id });
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
    });
  });
});