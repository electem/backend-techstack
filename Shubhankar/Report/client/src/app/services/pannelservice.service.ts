import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panel } from '../models/pannel';
import { Test } from '../models/test';
import { Report } from '../models/report';

const baseUrl = 'http://localhost:8000/panels';
const baseUrl2 = 'http://localhost:8000/tests';
const baseUrl3 = 'http://localhost:8000/reports';

@Injectable({
  providedIn: 'root',
})
export class PannelserviceService {
  panels!: Panel[];
  constructor(private http: HttpClient) {}

  createReport(data: Report) {
    return this.http.post(baseUrl3, data).toPromise();
  }

  async getAll(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(baseUrl).toPromise();
  }

  createPanel(data: Panel) {
    return this.http.post(baseUrl, data).toPromise();
  }

  createTest(data: Test) {
    return this.http.post(baseUrl2, data).toPromise();
  }

  async getPanel(id: Number) {
    return await this.http.get(`${baseUrl}/${id}`).toPromise();
  }

  updatePanel(data: Panel) {
    return this.http.put(baseUrl, data).toPromise();
  }
  async getAllTest() {
    return await this.http.get<Test[]>(baseUrl2).toPromise();
  }
}
