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
  update(data: TeacherData, id: any) {
    return http.put<any>(`/school/`, data);
  }
}

export default new TeacherDataService();
