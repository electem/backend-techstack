/* eslint-disable */
import http from "@/http-common";

class TutorialDataService {
async  getAll() {
    return await http.get("/tutorials");
  }

  get(id: number) {
    return http.get(`/tutorials/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/tutorials", data);
  }

 async update(id: any, data: any): Promise<any> {
    return await http.put(`/tutorials/${id}`, data);
  }

 async delete(id: any): Promise<any> {
    return await http.delete(`/tutorials/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/tutorials`);
  }

  findByTitle(title: string): Promise<any> {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new TutorialDataService();
