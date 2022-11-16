import http from "../http-common";
import { Teacher } from "../types/teacher.type";

class TeacherService {
  getTeachers() {
    return http.get<Array<Teacher>>("/teachers");
  }
}

export default new TeacherService();
