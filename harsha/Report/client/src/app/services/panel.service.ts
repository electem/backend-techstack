import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panel } from '../models/panel.model';
import { Report } from '../models/report.model';
import { Test } from '../models/test.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  tokenIs!: string;
  panel: Panel[] = [];

  constructor(private http: HttpClient) {}
  async getPanels(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(baseUrl + '/panels').toPromise();
  }

  async getPanelById(id: Number) {
    return await this.http.get(`${baseUrl + '/panels'}/${id}`).toPromise();
  }

  async createPanel(panel: Panel): Promise<Panel> {
    return await this.http.post(baseUrl + '/createPanel', panel).toPromise();
  }

  async updatePanel(id: any, panel: Panel): Promise<Panel> {
    return await this.http
      .put(`${baseUrl + '/updatePanel'}/${id}`, panel)
      .toPromise();
  }

  async getReports(): Promise<Report[]> {
    return await this.http.get<Report[]>(baseUrl + '/reports').toPromise();
  }

  async getReportById(id: Number) {
    return await this.http.get(`${baseUrl + '/reports'}/${id}`).toPromise();
  }

  async getTests(): Promise<Test[]> {
    return await this.http.get<Test[]>(baseUrl + '/tests').toPromise();
  }

  async createReport(report: Report): Promise<Report> {
    return await this.http.post(baseUrl + '/createReport', report).toPromise();
  }
}
