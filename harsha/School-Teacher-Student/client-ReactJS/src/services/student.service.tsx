import http from "../http-common";
import { Student } from "../types/student.type";

class StudentService {

  getStudents() {
    return http.get<Array<Student>>("/students");
  }

  create(student: Student) {
    return http.post<Student>("/createStudent", student);
  }

  get(id: any) {
    return http.get<Student>(`/student/${id}`);
  }

  update(student: Student, id: number) {
    return http.put<Student>(`/updateStudent/${id}`, student);
  }

  delete(id: number) {
    return http.delete(`/deleteStudent/${id}`);
  }
}

export default new StudentService();
