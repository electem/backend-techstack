import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panel } from '../models/panel.model';
import { Test } from '../models/test.model';

const panelUrl = 'http://localhost:8080/panels';
const addPanelUrl = 'http://localhost:8080/createPanel';
const updatePanelUrl = 'http://localhost:8080/updatePanel';
const testUrl = 'http://localhost:8080/tests';

@Injectable({
  providedIn: 'root',
})

export class PanelService {
  tokenIs!: string;
  panel: Panel[] = [];

  constructor(private http: HttpClient) {}

  async getPanels(): Promise<Panel[]> {
    return await this.http.get<Panel[]>(panelUrl).toPromise();
  }

  async createPanel(panel: Panel): Promise<any> {
    return await this.http.post(addPanelUrl, panel).toPromise();
  }

  async updatePanel(panel: Panel): Promise<any> {
    return await this.http.put(updatePanelUrl, panel).toPromise();
  }

  async getTests(): Promise<Test[]> {
    return await this.http.get<Test[]>(testUrl).toPromise();
  }
}
