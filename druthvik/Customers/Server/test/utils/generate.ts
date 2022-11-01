import * as faker from 'faker';
import { Test } from '../../src/models/test';

export function generatePanelPayload() {
  return {
    name: faker.name.firstName(),
    description: faker.lorem.paragraph(),
  };
}
export function generatePanelData(overide = {}) {
  return {
    name: faker.name.firstName(),
    description: faker.lorem.paragraph(),
    test: new Test(),
    ...overide,
  };
}
export function generatePanelsData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePanelData(overide);
    },
  );
}
