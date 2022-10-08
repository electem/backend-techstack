import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panel } from '../models/panel.model';
import { Test } from '../models/test.model';
import { Report } from '../models/report.model';
import { Reportpaneltest } from '../models/reportpaneltest.model';
import studentJson from '../datatables.json';
import { Student } from '../models/student';
import { environment } from '../../environments/environment';
class
const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})

export class PanelService {
  panels!: Panel[];
  studentdetails = studentJson;

  constructor(private http:HttpClient) {}

  async getAllPanels(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(baseUrl + '/panel').toPromise();
  }

  async createPanel(panelData: Panel): Promise<Panel[]> {
    const myMap = { name: panelData.name, description: panelData.description };
    return this.http.post<Panel[]>(baseUrl + '/panel', myMap).toPromise();
  }

  async getPanel(id: number): Promise<Panel> {
    return await this.http.get(`${baseUrl + '/panel'}/${id}`).toPromise();
  }

  async updatePanel(panelData: Panel): Promise<Panel> {
    return this.http.put<Panel>(baseUrl + '/panel', panelData).toPromise();
  }

  async getAllTest(): Promise<Test[]> {
    return await this.http.get<Test[]>(baseUrl + '/test').toPromise();
  }

  async createReport(reportData: Report): Promise<Report> {
    return this.http.post<Report>(baseUrl + '/report', reportData).toPromise();
  }

  async getAllReport(): Promise<Report[]> {
    return await this.http.get<Report[]>(baseUrl + '/report').toPromise();
  }

  async getAllReportpaneltest(): Promise<Reportpaneltest[]> {
    return await this.http
      .get<Reportpaneltest[]>(baseUrl + '/reportpaneltest')
      .toPromise();
  }

  async getAllStudent(length: number, start: number): Promise<Array<Student>> {
    const records = this.studentdetails.splice(start, length);
    return records;
  }
}