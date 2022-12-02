import http from "../http-common";
import { Panel } from "../types/panel.type";

class PanelService {
 
  getPanels() {
    return http.get<Array<Panel>>("/panels");
  }

  create(panel: Panel) {
    return http.post<Panel>("/createPanel", panel);
  }

  get(id: string) {
    return http.get<Panel>(`/panels/${id}`);
  }

  update(panel: Panel, id: number) {
    return http.put<Panel>(`/updatePanel/${id}`, panel);
  }

  delete(id: number) {
    return http.delete(`/deletePanel/${id}`);
  }

  getAllPanels(page: number,size:number) {
    return http.get(`/panelsList?page=${page}&size=${size}`);
  }
}

export default new PanelService();
