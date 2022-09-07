import fs from 'fs';
import { TrafficVoilationManagement } from './traffic_voilations';

const datefile = './datelist.txt';

describe('Return Mock data to test the function', () => {
  test('should return data', () => {
    const readFile = new TrafficVoilationManagement();
    const output = readFile.loadVoilations(datefile);
    expect(output).not.toEqual(null);
    expect(output.length).toEqual(10);
  });
});
describe('File created according date', () => {
  test('should return data', () => {
    const trafficVoilationManagement = new TrafficVoilationManagement();
    const allViolation: string[] = [
      '2020-05-20:  Traffic Jump',
      '2020-07-13:  Pillion Rider Not Wearing Helmet',
      '2021-04-10:  No Documents',
      '2021-09-05:  Rider Not Wearing Helmet',
      '2021-11-08:  Speed Voilation',
      '2022-03-15:  Triple Riding',
      '2020-06-24:  No Parking Voilation',
      '2022-04-17:  DL Expired',
      '2021-10-07:  Wrong Route',
      '2022-05-01:  No Emission Test Certificate',
    ];
    trafficVoilationManagement.sortDate(allViolation);
    expect(fs.existsSync('./2020.txt')).toBeTruthy();
    expect(fs.existsSync('./2021.txt')).toBeTruthy();
    expect(fs.existsSync('./2022.txt')).toBeTruthy();
    const count = countLinesInaFile('./2020.txt');
    expect(count).toEqual(2);
    const count1 = countLinesInaFile('./2021.txt');
    expect(count1).toEqual(2);
    const count2 = countLinesInaFile('./2022.txt');
    expect(count2).toEqual(2);
  });
});
describe('Return Mock data to test the function', () => {
  test('should return data', () => {
    const readFile = new TrafficVoilationManagement();
    const file = readFile.storeViolationByYear('year', 'voilations');
  });
});

function countLinesInaFile(file: string): number {
  try {
    let fileLines = fs.readFileSync(file, 'utf-8').split('\n');
    return fileLines.length;
  } catch (err) {
    return 0;
  }
}
