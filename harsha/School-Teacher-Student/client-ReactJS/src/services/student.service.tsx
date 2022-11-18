import http from "../http-common";
import { Student } from "../types/student.type";

class StudentService {
  genders: string[] = ["Male", "Female"];

  getStudents() {
    return http.get<Array<Student>>("/students");
  }

  create(student: Student) {
    return http.post<Student>("/createStudent", student);
  }

  get(id: any) {
    return http.get<Student>(`/student/${id}`);
  }

  update(student: Student, id: any) {
    return http.put<any>(`/updateStudent/${id}`, student);
  }

  delete(id: any) {
    return http.delete<any>(`/deleteStudent/${id}`);
  }

  getGenders() {
    return this.genders;
  }
}

export default new StudentService();
