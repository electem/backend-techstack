import http from "../http-common";
import { TeacherData } from "../types/teacher.types";

class TeacherDataService {
  getAll() {
    return http.get<Array<TeacherData>>("/teacher");
  }
  create(school: TeacherData) {
    return http.post<TeacherData>("/teacher", school);
  }
  get(id: string) {
    return http.get<TeacherData>(`/teacher/${id}`);
  }
}

export default new TeacherDataService();
