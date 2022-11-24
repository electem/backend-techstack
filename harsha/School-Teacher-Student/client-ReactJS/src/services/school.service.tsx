import http from "../http-common";
import { School } from "../types/school.type";
import authHeader from "./auth-header";

class SchoolService {
  getSchools() {
    return http.get<Array<School>>("/schools", { headers: authHeader() });
  }

  create(school: School) {
    return http.post<School>("/createSchool", school);
  }

  get(id: string) {
    return http.get<School>(`/school/${id}`);
  }

  update(school: School, id: number) {
    return http.put<School>(`/updateSchool/${id}`, school);
  }

  delete(id: number) {
    return http.delete(`/deleteSchool/${id}`);
  }
}

export default new SchoolService();
