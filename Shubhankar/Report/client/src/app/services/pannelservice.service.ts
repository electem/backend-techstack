import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panel } from '../models/pannel';
import { Test } from '../models/test';
import { Report } from '../models/report';
import { Reporttestpanel } from '../models/reporttestpanel';
import employeeRecord from '../data.json';
import companyRecord from '../company.json';
import datatableRecord from '../datatable.json';
import { Employee } from '../models/employee';
import { Person } from '../models/person';
import { environment } from '../../environments/environment';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PannelService {
  getdatatable(start: number, length: number) {
    const databada: Person[] = [];
    for (let i = start; i < start + length; i++) {
      databada.push(datatableRecord[i]);
    }
    return databada;
  }

  getEmployee() {
    return employeeRecord;
  }

  getCompany() {
    return companyRecord;
  }

  async getEmployees(): Promise<Employee[]> {
    return await this.http.get<Employee[]>(baseUrl + '/employees').toPromise();
  }

  createEmployee(employee: Employee) {
    return this.http
      .post(baseUrl + '/employees/employee', employee)
      .toPromise();
  }

  panels!: Panel[];
  constructor(private http: HttpClient) {}

  createReport(data: Report) {
    return this.http.post(baseUrl + '/reports', data).toPromise();
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

  createReporttestpanel(data: Reporttestpanel) {
    return this.http.post(baseUrl + '/reportpaneltest', data).toPromise();
  }

  createPanel(data: Panel) {
    const map = { name: data.name, description: data.description };
    console.log(map);
    return this.http.post(baseUrl + '/panels', map).toPromise();
  }

  createTest(data: Test) {
    return this.http.post(baseUrl + '/tests', data).toPromise();
  }

  async getPanel(id: Number) {
    return await this.http.get(`${baseUrl + '/panels'}/${id}`).toPromise();
  }

  updatePanel(data: Panel) {
    return this.http.put(baseUrl + '/panels', data).toPromise();
  }

  async getAllTest(): Promise<Test[]> {
    return await this.http.get<Test[]>(baseUrl + '/tests').toPromise();
  }
}
