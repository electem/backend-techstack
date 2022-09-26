import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panel } from '../models/panel.model';
import { Test } from '../models/test.model';
import { Report } from '../models/report.model';
import { ReportTestPanel } from '../models/reporttestpanel.model';

const baseUrl = 'http://localhost:8000/panel';
const baseUrl1 = 'http://localhost:8000/test';
const baseUrl2 = 'http://localhost:8000/report';
const baseUrl3 = 'http://localhost:8000/reportpaneltest';
@Injectable({
  providedIn: 'root',
})
export class PanelService {
  constructor(private http: HttpClient) {}

  async getAllPanel(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(baseUrl).toPromise();
  }

  async getAllTests(): Promise<Test[]> {
    return await this.http.get<Test[]>(baseUrl1).toPromise();
  }

  async getAllTests1(panel: Panel): Promise<Test[]> {
    return await this.http.get<Test[]>(baseUrl1).toPromise();
  }
  async getPanelById(id: number) {
    return await this.http.get(`${baseUrl}/${id}`).toPromise();
  }

  async createPanel(panel: Panel): Promise<Panel[]> {
    return await this.http.post<Panel[]>(baseUrl, panel).toPromise();
  }

  async update(data: Panel) {
    return await this.http.put(baseUrl, data).toPromise();
  }

  async createReport(report: Report): Promise<Report> {
    return await this.http.post<Report>(baseUrl2, report).toPromise();
  }

  async getReportPaneltest(): Promise<ReportTestPanel[]> {
    return await this.http.get<ReportTestPanel[]>(baseUrl3).toPromise();
  }
}
