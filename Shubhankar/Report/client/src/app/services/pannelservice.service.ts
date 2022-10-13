import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panel } from '../models/pannel';
import { Test } from '../models/test';
import { Report } from '../models/report';
import { Reporttestpanel } from '../models/reporttestpanel';
import { Employee } from '../models/employee';
import employeeRecord from '../data.json';
import companyRecord from '../company.json';
import { environment } from '../../environments/environment';
import { Person } from '../models/person';
import datatableRecord from '../datatable.json';
import stockRecord from '../stock.json'


const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PannelService {
  panels!: Panel[];
  data = employeeRecord;
  data1 = companyRecord;
  Stock= stockRecord;

  constructor(private http: HttpClient) {}

  getdatatable(start: number, length: number) {
    const databada: Person[] = [];
    for (let i = start; i < start + length; i++) {
      databada.push(datatableRecord[i]);
    }
    return databada;
  }

getStock(){
  return stockRecord;
}


  getEmployee() {
    return employeeRecord;
  }

  getCompany() {
    return companyRecord;
  }
  createEmployee(employee: Employee) {
    return this.http.post(baseUrl + '/employees/employee', employee).toPromise();
  }

  createReport(report: Report) {
    return this.http.post(baseUrl + '/reports', report).toPromise();
  }

  async getRecords(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(baseUrl + '/reports').toPromise();
  }

  async getReportbyid(id: Number) {
    return await this.http.get(`${baseUrl + '/reports'}/${id}`).toPromise();
  }

  async getAllReportTestPanel(): Promise<Reporttestpanel[]> {
    return await this.http
      .get<Reporttestpanel[]>(baseUrl + '/reportpaneltest')
      .toPromise();
  }

  async getAll(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(baseUrl + '/panels').toPromise();
  }
  createReporttestpanel(reportpaneltest: Reporttestpanel) {
    return this.http.post(baseUrl + '/reportpaneltest', reportpaneltest).toPromise();
  }

  createPanel(panel: Panel) {
    return this.http.post(baseUrl + '/panels', panel).toPromise();
  }

  createTest(test: Test) {
    return this.http.post(baseUrl + '/tests', test).toPromise();
  }

  async getPanel(id: Number) {
    return await this.http.get(`${baseUrl + '/panels'}/${id}`).toPromise();
  }

  updatePanel(panel: Panel) {
    return this.http.put(baseUrl + '/panels', panel).toPromise();
  }
  async getAllTest(): Promise<Test[]> {
    return await this.http.get<Test[]>(baseUrl + '/tests').toPromise();
  }
}
