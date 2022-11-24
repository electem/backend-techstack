import http from "../http-common";
import { Teacher } from "../types/teacher.type";

class TeacherService {
  getTeachers() {
    return http.get<Array<Teacher>>("/teachers");
  }

  create(teacher: Teacher) {
    return http.post<Teacher>("/createTeacher", teacher);
  }

  get(id: any) {
    return http.get<Teacher>(`/teacher/${id}`);
  }

  update(teacher: Teacher, id: number) {
    return http.put<Teacher>(`/updateTeacher/${id}`, teacher);
  }

  delete(id: number) {
    return http.delete(`/deleteTeacher/${id}`);
  }
}

export default new TeacherService();
