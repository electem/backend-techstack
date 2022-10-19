import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Panel } from '../models/panel.model';
import { Report } from '../models/report.model';
import { ReportPanelTest } from '../models/reportlist.model';
import { Test } from '../models/test.model';

const url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  tokenIs!: string;
  panel: Panel[] = [];
  test: Test[] = [];
  reports: Report[] = [];
  reportList: ReportPanelTest[] = [];

  constructor(private http: HttpClient) {}

  async getPanels(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(url + '/panels').toPromise();
  }

  async createNewPanel(panel: Panel) {
    return await this.http.post(url + '/createPanel', panel).toPromise();
  }

  async createPanel(panel: Panel): Promise<Panel> {
    const convertMap = { name: panel.name, description: panel.description };
    return await this.http
      .post<Panel>(url + '/PanelData', convertMap)
      .toPromise();
  }

  async updatePanel(panel: Panel): Promise<Panel> {
    return await this.http.put(url + '/updatePanel', panel).toPromise();
  }

  async createReport(panel: Panel) {
    return await this.http.post(url + '/createReport', panel).toPromise();
  }

  async getAllTest(): Promise<Test[]> {
    return await this.http.get<Test[]>(url + '/tests').toPromise();
  }

  async getPanelByID(id: number) {
    return await this.http.get(`${url + '/panels'}/${id}`).toPromise();
  }

  async getAllReport(): Promise<Report[]> {
    return await this.http.get<Report[]>(url + '/report').toPromise();
  }

  async createReportList(reportList: ReportPanelTest) {
    return await this.http
      .post(url + '/createReportPanelTests', reportList)
      .toPromise();
  }

  async getAllReportList(): Promise<ReportPanelTest[]> {
    return await this.http
      .get<ReportPanelTest[]>(url + '/ReportPanelTest')
      .toPromise();
  }
}
