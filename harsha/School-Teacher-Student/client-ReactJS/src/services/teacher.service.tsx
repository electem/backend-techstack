import http from "../http-common";
import { Teacher } from "../types/teacher.type";

class TeacherService {
  getTeachers() {
    return http.get<Array<Teacher>>("/teachers");
  }

  create(teacher: Teacher) {
    return http.post<Teacher>("/createTeacher", teacher);
  }

  delete(id: any) {
    return http.delete<any>(`/deleteTeacher/${id}`);
  }
}

export default new TeacherService();
