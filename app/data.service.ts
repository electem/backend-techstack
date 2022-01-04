import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  info1: string[] = ['Ram', 'E213', 'Ram@tcs.net'];
  info2: string[] = ['Hari', 'E345', 'Hari@inf.net'];
  info3: string[] = ['Sam', 'E342', 'Sam@infer.net'];
  getInfo1(): string[] {
    return this.info1;
  }
  getInfo2(): string[] {
    return this.info2;
  }
  getInfo3(): string[] {
    return this.info3;
  }
   addInfo(info: any): void{
    this.info1.push(info);
    this.info2.push(info);
    this.info3.push(info);
  }
  constructor() { }
}
