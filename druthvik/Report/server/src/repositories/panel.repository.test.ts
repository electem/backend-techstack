import * as panelRepository from '../repositories/panel.repository';
import { getRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import {
  generatePanelPayload,
  generatePanelData,
  generatePanelsData,
} from '../../test/utils/generate';
jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}));
beforeEach(() => {
  mockedGetRepo.find.mockClear();
  mockedGetRepo.findOne.mockClear();
  mockedGetRepo.save.mockClear();
});
describe('addPanel', () => {
  test('should add panel to the database', async () => {
    const payload = generatePanelPayload();
    const panelData = generatePanelData(payload);
    mockedGetRepo.save.mockResolvedValue(panelData);
    const panel = await panelRepository.createPanel(payload);
    expect(panel).toMatchObject(payload);
    expect(panel).toEqual(panelData);
    expect(mockedGetRepo.save).toHaveBeenCalledWith(payload);
    expect(mockedGetRepo.save).toHaveBeenCalledTimes(1);
  });
});
describe('Return Panel', () => {
  test('should return panel  list', async () => {
    const panelsdata = generatePanelsData(2);
    mockedGetRepo.find.mockResolvedValue(panelsdata);
    const panels = await panelRepository.getPanels();
    expect(panels).toEqual(panelsdata);
    expect(mockedGetRepo.find).toBeCalledWith();
    expect(mockedGetRepo.find).toBeCalledTimes(1);
  });
});
