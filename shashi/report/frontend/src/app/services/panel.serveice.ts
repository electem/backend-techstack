import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panel } from '../models/panel.model';
import { Test } from '../models/test.model';
import { Report } from '../models/report.model';
import { Reportpaneltest } from '../models/reportpaneltest.model';
import studentJson from '../datatables.json';
import { Student } from '../models/student';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000';

const map = new Map();
@Injectable({
  providedIn: 'root',
})
export class PanelService {
  panels!: Panel[];
  studentdetails = studentJson;
  constructor(private http: HttpClient) {}

  async getAllPanels(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(baseUrl + '/panel').toPromise();
  }

  // createPanel(data: Panel): Promise<Panel> {
  //   return this.http.post<Panel>(baseUrl + '/panel', data).toPromise();
  // }

  //create panel map object
  createPanel(data: Panel): Promise<Panel[]> {
    const myMap = { name: data.name, description: data.description };
    console.log(myMap);
    return this.http.post<Panel[]>(baseUrl + '/panel', myMap).toPromise();
  }

  async getPanel(id: Number): Promise<Panel> {
    return await this.http.get(`${baseUrl + '/panel'}/${id}`).toPromise();
  }

  updatePanel(data: Panel): Promise<Panel> {
    return this.http.put<Panel>(baseUrl + '/panel', data).toPromise();
  }
  async getAllTest(): Promise<Test[]> {
    return await this.http.get<Test[]>(baseUrl + '/test').toPromise();
  }
  createReport(data: Report): Promise<Report> {
    return this.http.post<Report>(baseUrl + '/report', data).toPromise();
  }
  async getAllReport(): Promise<Report[]> {
    return await this.http.get<Report[]>(baseUrl + '/report').toPromise();
  }
  async getAllReportpaneltest(): Promise<Reportpaneltest[]> {
    return await this.http
      .get<Reportpaneltest[]>(baseUrl + '/reportpaneltest')
      .toPromise();
  }
  getAllStudent(length: number, start: number): Array<Student> {
    var records = this.studentdetails.splice(start, length);
    console.log(records);
    return records;
  }
}
