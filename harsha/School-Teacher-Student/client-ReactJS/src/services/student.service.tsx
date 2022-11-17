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

  delete(id: any) {
    return http.delete<any>(`/deleteStudent/${id}`);
  }

  getGenders() {
    return this.genders;
  }
}

export default new StudentService();
