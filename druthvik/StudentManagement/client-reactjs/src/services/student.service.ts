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

  update(data: IStudentData, id: any) {
    return http.put<any>(`/student/`, data);
  }
  delete(id: any) {
    return http.delete<any>(`/student/${id}`);
  }
}

export default new StudentDataService();
