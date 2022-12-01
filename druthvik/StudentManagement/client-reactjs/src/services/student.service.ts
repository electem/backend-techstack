import http from "../http-common";
import { IStudentData } from "../types/student.types";
class StudentDataService {
  getAllStudents() {
    return http.get<Array<IStudentData>>("/student");
  }
  createStudents(student: IStudentData) {
    return http.post<IStudentData>("/student", student);
  }
  getStudentById(id: string) {
    return http.get<IStudentData>(`/student/${id}`);
  }

  updateStudent(student: IStudentData, id: number) {
    return http.put<IStudentData>(`/student/${id}`, student);
  }
  deleteStudent(id: number) {
    return http.delete(`/student/${id}`);
  }
}

export default new StudentDataService();
