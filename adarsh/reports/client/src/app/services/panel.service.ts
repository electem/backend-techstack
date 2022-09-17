import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panel } from '../models/panel.model';
import { Report } from '../models/report.model';
import { Test } from '../models/test.model';

const panelUrl = 'http://localhost:8080/panels';
const addPanelUrl = 'http://localhost:8080/createPanel';
const getTest = 'http://localhost:8080/tests';
const addReport = 'http://localhost:8080/createReport';
const updatePanelUrl = 'http://localhost:8080/updatePanel';
const getReport = 'http://localhost:8080/report';


@Injectable({
  providedIn: 'root',
})
export class PanelService {
  tokenIs!: string;
  panel: Panel[] = [];
  test: Test[] = [];
  reports: Report[] = [];

  constructor(private http: HttpClient) {}

  async getPanels(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(panelUrl).toPromise();
  }

  async createPanel(panel: Panel) {
    return await this.http.post(addPanelUrl, panel).toPromise();
  }
  async updatePanel(panel: Panel): Promise<any> {
    return await this.http.put(updatePanelUrl, panel).toPromise();
  }


  async createReport(panel: Panel) {
    return await this.http.post(addReport, panel).toPromise();
  }

  async getAllTest(): Promise<Test[]> {
    return await this.http.get<Test[]>(getTest).toPromise();
  }
  async getPanelByID(id: Number) {
    return await this.http.get(`${panelUrl}/${id}`).toPromise();
  }
  async getAllReport(): Promise<Report[]> {
    return await this.http.get<Report[]>(getReport).toPromise();
  }

}
