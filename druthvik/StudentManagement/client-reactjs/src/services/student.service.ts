import http from "../http-common";
import { IStudentData } from "../types/student.types";
class StudentDataService {
  getAll() {
    return http.get<Array<IStudentData>>("/student");
  }
  create(student: IStudentData) {
    return http.post<IStudentData>("/student", student);
  }
  get(id: string) {
    return http.get<IStudentData>(`/student/${id}`);
  }
}

export default new StudentDataService();
