import http from "../http-common";
import { Student } from "../types/student.type";

class StudentService {
  getStudents() {
    return http.get<Array<Student>>("/students");
  }
}

export default new StudentService();
