import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panel } from '../models/panel.model';

const panelUrl = 'http://localhost:8080/panels';
const addPanelUrl = 'http://localhost:8080/createPanel';

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
}
