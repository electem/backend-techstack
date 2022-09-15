import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panel } from '../models/panel.model';
import { Test } from '../models/test.model';

const panelUrl = 'http://localhost:8080/panels';
const addPanelUrl = 'http://localhost:8080/createPanel';
const getTest = 'http://localhost:8080/tests';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  tokenIs!: string;
  panel: Panel[] = [];
  test: Test[] = [];

  constructor(private http: HttpClient) {}

  async getPanels(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(panelUrl).toPromise();
  }

  async createPanel(panel: Panel) {
    return await this.http.post(addPanelUrl, panel).toPromise();
  }
  async getAllTest(): Promise<Test[]> {
    return await this.http.get<Test[]>(getTest).toPromise();
  }
  async getPanelByID(id: Number) {
    return await this.http.get(`${panelUrl}/${id}`).toPromise();
  }

  async findByName(name: string) {
    return await this.http.get<Panel[]>(`${panelUrl}?name=${name}`).toPromise();
  }
}
