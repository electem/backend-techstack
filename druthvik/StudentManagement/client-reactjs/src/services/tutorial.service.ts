import http from "../http-common";
import ITutorialData from "../types/tutorial.type";

class TutorialDataService {
  getAll() {
    return http.get<Array<ITutorialData>>("/tutorial");
  }

  get(id: string) {
    return http.get<ITutorialData>(`/tutorial/${id}`);
  }

  create(data: ITutorialData) {
    return http.post<ITutorialData>("/tutorial", data);
  }

  update(data: ITutorialData, id: any) {
    return http.put<any>(`/tutorial/`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/tutorial/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/tutorial`);
  }

  findByTitle(title: string) {
    return http.get<Array<ITutorialData>>(`/tutorial?title=${title}`);
  }
}

export default new TutorialDataService();
