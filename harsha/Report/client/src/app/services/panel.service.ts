import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panel } from '../models/panel.model';
import { ReportPanelTest } from '../models/report-panel-test.model';
import { Test } from '../models/test.model';
import { Pagination } from '../models/pagination.model';
import { Employee } from '../models/employee.model';
import productJson from '../product.json';
import productJsonData from '../productList.json';

const baseUrl = 'http://localhost:8080';

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
    return await this.http.get<Panel[]>(baseUrl + '/panels').toPromise();
  }

  async getPanelById(id: Number) {
    return await this.http.get(`${baseUrl + '/panels'}/${id}`).toPromise();
  }

  async createPanel(panel: Panel): Promise<Panel> {
    return await this.http
      .post<Panel>(baseUrl + '/createPanel', panel)
      .toPromise();
  }

  async updatePanel(id: any, panel: Panel): Promise<Panel> {
    return await this.http
      .put(`${baseUrl + '/updatePanel'}/${id}`, panel)
      .toPromise();
  }
  async getTests(): Promise<Test[]> {
    return await this.http.get<Test[]>(baseUrl + '/tests').toPromise();
  }

  async createReportPanelTests(
    reportPanelTest: ReportPanelTest
  ): Promise<ReportPanelTest> {
    return await this.http
      .post(baseUrl + '/createReportPanelTests', reportPanelTest)
      .toPromise();
  }

  async getReportPanelTests(): Promise<ReportPanelTest[]> {
    return await this.http
      .get<ReportPanelTest[]>(baseUrl + '/reportPanelTests')
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
      .post<Employee[]>(baseUrl + '/employees', this.pagination)
      .toPromise();
  }

  async createPanelByMap(panel: Panel): Promise<Panel> {
    const mapObject = { name: panel.name, description: panel.description };
    return await this.http
      .post(baseUrl + '/createPanelByMap', mapObject)
      .toPromise();
  }

  async getProduct() {
    return await this.productObject;
  }

  async getProductsList() {
    return await this.products;
  }

  async createProduct(product: Product): Promise<any> {
    console.log(product);
    return await this.http
      .post(baseUrl + '/createProduct', product)
      .toPromise();
  }
}
