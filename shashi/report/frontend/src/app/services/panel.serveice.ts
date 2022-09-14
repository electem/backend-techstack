import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panel } from '../models/panel.model';
import { Test } from '../models/test.model';

const baseUrl = 'http://localhost:8000/panel';
const baseUrl2 = 'http://localhost:8000/test';
@Injectable({
  providedIn: 'root',
})
export class PanelService {
  panels!: Panel[];
  constructor(private http: HttpClient) {}

  async getAll(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(baseUrl).toPromise();
  }

  createPanel(data: Panel) {
    return this.http.post(baseUrl, data).toPromise();
  }

  async getPanel(id: Number): Promise<Panel> {
    return await this.http.get(`${baseUrl}/${id}`).toPromise();
  }

  updatePanel(data: Panel) {
    return this.http.put(baseUrl, data).toPromise();
  }
  async getAllTest() {
    return await this.http.get<Test[]>(baseUrl2).toPromise();
  }
}
