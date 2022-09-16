import faker from 'faker'

export function generatePanelData(overide = {}) {
  return {
    id: faker.random.number(),
    name: faker.name.findName(),
    description: faker.name.lastName(),
    tests: [],
    ...overide
  }
}
export function generatePanelsData(n: number = 1) {
  return Array.from({
    length: n
  }, (_, i) => {
    return generatePanelData()
  });
}
export function generatePanelPayload() {
  return {
    name: faker.name.firstName(),
    description: faker.name.firstName(),
    }
}
export function generateTestData(overide = {}) {
  return {
    id: faker.random.number(),
    name: faker.name.findName(),
    panel:[],
    ...overide
  }
}
export function generateTestsData(n: number = 1) {
  return Array.from({
    length: n
  }, (_, i) => {
    return generateTestData()
  });
}
export function generateTestPayload() {
  return {
    name: faker.name.firstName(),
    }
}