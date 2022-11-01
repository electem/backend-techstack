import * as fs from 'fs';
import { join } from 'path';

export class TrafficVoilationManagement {
  loadVoilations(inputFile: string): string[] {
    const data = fs.readFileSync(join(__dirname, inputFile), 'utf-8');
    const textByLine = data.toString().split('\n');
    console.log(textByLine);
    return textByLine;
    //testby line give split form of data from that text file
  }

  sortDate(allVoilations: string[]): void {
    allVoilations.forEach((aVoilation: any) => {
      const year = aVoilation.slice(0, 4);
      this.storeViolationByYear(year, aVoilation);
    });
  }

  storeViolationByYear(voilationYear: string, voilation: string): void {
    fs.access(`../TrafficVoilationsFiles/${voilationYear}`, (exist: any) => {
      if (exist) {
        fs.writeFileSync(
          `../TrafficVoilationsFiles/${voilationYear}.txt`,
          voilation,
        );
      } else {
        fs.appendFileSync(
          `../TrafficVoilationsFiles/${voilationYear}.txt`,
          voilation,
        );
      }
    });
  }
}
