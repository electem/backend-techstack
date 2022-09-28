import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panel } from '../models/pannel';
import { Test } from '../models/test';
import { Report } from '../models/report';
import { Reporttestpanel } from '../models/reporttestpanel';
import employeeRecord from '../data.json';
import companyRecord from '../company.json'

const baseUrl4 = 'http://localhost:8000';

@Injectable({
  providedIn: 'root',
})
export class PannelserviceService {
  panels!: Panel[];
  data = employeeRecord;
  data1 =companyRecord;

  constructor(private http: HttpClient) {}

  getEmployee() {
    return employeeRecord;
  }

  getCompany() {
    return companyRecord;
  }

  createEmployee(data: any): Promise<Object> {
    return data;
  }

  createReport(data: Report) {
    return this.http.post(baseUrl4 + '/reports', data).toPromise();
  }

  async getRecords(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(baseUrl4 + '/reports').toPromise();
  }

  async getReportbyid(id: Number) {
    return await this.http.get(`${baseUrl4 + '/reports'}/${id}`).toPromise();
  }

  async getAllReportTestPanel(): Promise<Reporttestpanel[]> {
    return await this.http
      .get<Reporttestpanel[]>(baseUrl4 + '/reportpaneltest')
      .toPromise();
  }

  async getAll(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(baseUrl4 + '/panels').toPromise();
  }
  createReporttestpanel(data: Reporttestpanel) {
    return this.http.post(baseUrl4 + '/reportpaneltest', data).toPromise();
  }

  createPanel(data: Panel) {
    return this.http.post(baseUrl4 + '/panels', data).toPromise();
  }

  createTest(data: Test) {
    return this.http.post(baseUrl4 + '/tests', data).toPromise();
  }

  async getPanel(id: Number) {
    return await this.http.get(`${baseUrl4 + '/panels'}/${id}`).toPromise();
  }

  updatePanel(data: Panel) {
    return this.http.put(baseUrl4 + '/panels', data).toPromise();
  }
  async getAllTest(): Promise<Test[]> {
    return await this.http.get<Test[]>(baseUrl4 + '/tests').toPromise();
  }
}
