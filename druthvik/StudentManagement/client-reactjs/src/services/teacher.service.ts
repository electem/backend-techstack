import http from "../http-common";
import { TeacherData } from "../types/teacher.types";

class TeacherDataService {
  getAllTeachers() {
    return http.get<Array<TeacherData>>("/teacher");
  }
  createTeacher(teacher: TeacherData) {
    return http.post<TeacherData>("/teacher", teacher);
  }
  getTeacherById(id: string) {
    return http.get<TeacherData>(`/teacher/${id}`);
  }
  updateTeacher(teacher: TeacherData, id: number) {
    return http.put<TeacherData>(`/teacher/`, teacher);
  }
  deleteTeacher(id: number) {
    return http.delete(`/teacher/${id}`);
  }
}

export default new TeacherDataService();
