import http from "../http-common";
import { School } from "../types/school.type";

class SchoolService {
  getSchools() {
    return http.get<Array<School>>("/schools");
  }

  create(school: School) {
    return http.post<School>("/createSchool", school);
  }

  get(id: any) {
    return http.get<School>(`/school/${id}`);
  }

  update(school: School, id: any) {
    return http.put<any>(`/updateSchool/${id}`, school);
  }

  delete(id: any) {
    return http.delete<any>(`/deleteSchool/${id}`);
  }
}

export default new SchoolService();
