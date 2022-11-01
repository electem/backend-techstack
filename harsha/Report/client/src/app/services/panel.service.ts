import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panel } from '../models/panel.model';
import { ReportPanelTest } from '../models/report-panel-test.model';
import { Report } from '../models/report.model';
import { Test } from '../models/test.model';
import { Pagination } from '../models/pagination.model';
import { Employee } from '../models/employee.model';
import productJson from '../product.json';
import productJsonData from '../productList.json';
import { environment } from '../../environments/environment';
const panelUrl = 'http://localhost:8080/panels';
const addPanelUrl = 'http://localhost:8080/createPanel';
const updatePanelUrl = 'http://localhost:8080/updatePanel';
const testUrl = 'http://localhost:8080/tests';
const panelByIdUrl = 'http://localhost:8080/panels';
const addReportUrl = 'http://localhost:8080/createReport';
const baseUrl = environment.url;

interface Product {
  id?: number;
  name?: string;
  type?: string;
  amount?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  tokenIs!: string;
  panel: Panel[] = [];
  pagination = new Pagination();
  productObject = productJson;
  products: Product[] = productJsonData;

  constructor(private http: HttpClient) {}

  async getPanels(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(baseUrl + 'panels').toPromise();
  }

  async createPanel(panel: Panel): Promise<Panel> {
    return await this.http
      .post<Panel>(baseUrl + 'createPanel', panel)
      .toPromise();
  }

  async getPanelById(id: number) {
    return await this.http.get(`${baseUrl + 'panels'}/${id}`).toPromise();
  }

  async getPanelById(id: Number) {
    return await this.http.get(`${panelByIdUrl}/${id}`).toPromise();
  }

  async createPanel(panel: Panel): Promise<Panel> {
    return await this.http.post(addPanelUrl, panel).toPromise();
  }

  async createReport(report: Report): Promise<Report> {
    return await this.http.post(addReportUrl, report).toPromise();
  }

  async updatePanel(id: any, panel: Panel): Promise<Panel> {
    return await this.http.put(`${updatePanelUrl}/${id}`, panel).toPromise();
  async updatePanel(id: number, panel: Panel): Promise<Panel> {
    return await this.http
      .put(`${baseUrl + 'updatePanel'}/${id}`, panel)
      .toPromise();
  }

  async getReports(): Promise<Report[]> {
    return await this.http.get<Report[]>(baseUrl + 'reports').toPromise();
  }

  async getReportById(id: number) {
    return await this.http.get(`${baseUrl + 'reports'}/${id}`).toPromise();
  }

  async getTests(): Promise<Test[]> {
    return await this.http.get<Test[]>(baseUrl + 'tests').toPromise();
  }

  async createReport(report: Report): Promise<Report> {
    return await this.http.post(baseUrl + 'createReport', report).toPromise();
  }

  async createReportPanelTests(
    reportPanelTest: ReportPanelTest
  ): Promise<ReportPanelTest> {
    return await this.http
      .post(baseUrl + 'createReportPanelTests', reportPanelTest)
      .toPromise();
  }

  async getReportPanelTests(): Promise<ReportPanelTest[]> {
    return await this.http
      .get<ReportPanelTest[]>(baseUrl + 'eportPanelTests')
      .toPromise();
  }

  async getEmployees(
    startPoint: number,
    pageLength: number
  ): Promise<Employee[]> {
    this.pagination = {
      startPoint: startPoint,
      pageLength: pageLength,
    };
    return await this.http
      .post<Employee[]>(
        `${baseUrl + 'employees'}/${startPoint}/${pageLength}`,
        this.pagination
      )
      .toPromise();
  }

  async getProduct() {
    return await this.productObject;
  }

  async getProductsList() {
    return await this.products;
  }

  async createProduct(product: Product): Promise<Product> {
    return await this.http
      .post(baseUrl + '/createProduct', product)
      .toPromise();
  }

  async createPanelByMap(panel: Panel): Promise<Panel> {
    const mapObject = { name: panel.name, description: panel.description };
    return await this.http
      .post(baseUrl + '/createPanelByMap', mapObject)
      .toPromise();
  }
}
