import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panel } from '../models/panel.model';
import { Test } from '../models/test.model';
import { Report } from '../models/report.model';
import { ReportTestPanel } from '../models/reporttestpanel.model';
import student from '../services/students.json';
import { Student } from '../models/student.model';
import employee from '../services/employee.json';
import { Employee } from '../models/employee.model';
import { environment } from '../../environments/environment';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  employees = employee;
  students: Student[] = student;

  constructor(private http: HttpClient) {}

  getEmployee(start: number, length: number): Employee[] {
    const pageArray = [];
    for (let i = start; i < start + length; i++) {
      pageArray.push(this.employees[i]);
    }
    return pageArray;
  }

  async getAllPanel(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(baseUrl + '/panel').toPromise();
  }

  async getAllTests(): Promise<Test[]> {
    return await this.http.get<Test[]>(baseUrl + '/test').toPromise();
  }

  async getPanelById(id: number) {
    return await this.http.get(`${baseUrl + '/panel'}/${id}`).toPromise();
  }

  async createPanel(panel: Panel): Promise<Panel[]> {
    const myMap = { name: panel.name, description: panel.description };
    return await this.http.post<Panel[]>(baseUrl + 'panel', myMap).toPromise();
  }

  async update(panel: Panel) {
    return await this.http.put(baseUrl + '/panel', panel).toPromise();
  }

  async createReport(report: Report): Promise<Report> {
    return await this.http
      .post<Report>(baseUrl + '/report', report)
      .toPromise();
  }

  async getReportPaneltest(): Promise<ReportTestPanel[]> {
    return await this.http
      .get<ReportTestPanel[]>(baseUrl + '/reportpaneltest')
      .toPromise();
  }
}
