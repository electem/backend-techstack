import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panel } from '../models/panel.model';
import { Report } from '../models/report.model';
import { Test } from '../models/test.model';

const panelUrl = 'http://localhost:8080/panels';
const addPanelUrl = 'http://localhost:8080/createPanel';
const updatePanelUrl = 'http://localhost:8080/updatePanel';
const testUrl = 'http://localhost:8080/tests';
const panelByIdUrl = 'http://localhost:8080/panels';
const addReportUrl = 'http://localhost:8080/createReport';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  tokenIs!: string;
  panel: Panel[] = [];

  constructor(private http: HttpClient) {}

  async getPanels(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(panelUrl).toPromise();
  }

  async getPanelById(id: Number) {
    return await this.http.get(`${panelByIdUrl}/${id}`).toPromise();
  }

  async createPanel(panel: Panel): Promise<Panel> {
    return await this.http.post(addPanelUrl, panel).toPromise();
  }

  async createReport(report: Report): Promise<Report> {
    return await this.http.post(addReportUrl, report).toPromise();
  }

  async updatePanel(id: any, panel: Panel): Promise<Panel> {
    return await this.http.put(`${updatePanelUrl}/${id}`, panel).toPromise();
  }

  async getTests(): Promise<Test[]> {
    return await this.http.get<Test[]>(testUrl).toPromise();
  }
}
