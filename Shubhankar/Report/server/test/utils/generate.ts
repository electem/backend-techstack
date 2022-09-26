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

export function generateReportPanelTestData(overide = {}) {
  return {
    id: faker.random.number(),
    data: faker.name.findName(),
    panel_id: faker.random.number(),
    test_id:  faker.random.number(),
    report_id:faker.random.number(),
    ...overide
  }
}
export function generateReportPanelTestsData(n: number = 1) {
  return Array.from({
    length: n
  }, (_, i) => {
    return generateReportPanelTestData()
  });
}
export function generateReportPanelTestPayload() {
  return {
    data: faker.name.findName(),
    panel_id: faker.random.number(),
    test_id:  faker.random.number(),
    report_id:faker.random.number(),
    }
}