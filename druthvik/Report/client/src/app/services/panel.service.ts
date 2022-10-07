import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panel } from '../models/panel.model';
import { Test } from '../models/test.model';
import { Report } from '../models/report.model';
import { ReportTestPanel } from '../models/reporttestpanel.model';
import student from '../students.json';
import { Student } from '../models/student.model';
import employee from '../components/employee.json';
import { Employee } from '../models/employee.model';

const panel = new Panel();
let panelMap = new Map();
panelMap.set(panel.name, panel.description);

const map1 = new Map(Object.entries(Panel));
console.log(map1);

const baseUrl = 'http://localhost:8000/panel';
const baseUrl1 = 'http://localhost:8000/test';
const baseUrl2 = 'http://localhost:8000/report';
const baseUrl3 = 'http://localhost:8000/reportpaneltest';
@Injectable({
  providedIn: 'root',
})
export class PanelService {
  employees: Employee[] = employee;
  students: Student[] = student;
  constructor(private http: HttpClient) {}

  getEmployee(start: number, length: number): Employee[] {
    const pageArray = [];

    for (let i = start; i < start + length; i++) {
      pageArray.push(this.employees[i]);
    }
    console.log(pageArray);
    return pageArray;
  }

  getEmployees() {
    return this.employees;
  }

  getStudent() {
    return this.students;
  }
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
    const myMap = { name: panel.name, description: panel.description };
    return await this.http.post<Panel[]>(baseUrl, myMap).toPromise();
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
