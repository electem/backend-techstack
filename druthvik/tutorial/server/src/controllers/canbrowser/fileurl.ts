import * as fs from 'fs';
import { join } from 'path';
import { Resources } from './model/resource';

const url = './urls.txt';

export class urlextract {
  resourcesList: Resources[] = [];

  constructor(resourcesList: Resources[]) {
    this.resourcesList = resourcesList;
  }

  loadUrl(): string[] {
    const data = fs.readFileSync(join(__dirname, url), 'utf-8');
    const split = data.split('\n');
    console.log(split);
    return split;
  }

  copyUrl() {
    for (const resources of this.resourcesList) {
      const splitedData = this.loadUrl();
      for (const splited of splitedData) {
        resources.files = splitedData;
      }
    }
  }
}
