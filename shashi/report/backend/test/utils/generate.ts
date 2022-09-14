import faker from "faker";
import { Panel } from "../../src/models";

export function generatePanelData(overide = {}) {
  return {
    id: faker.random.number(),
    name: faker.name.title(),
    description: faker.lorem.text(),
    tests: [],
    ...overide,
  };
}
export function generatePanelsData(n: number = 1) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePanelData();
    }
  );
}
export function generatePanelPayload() {
  return {
    name: faker.name.title(),
    description: faker.lorem.text(),
    tests: [],
  };
}
