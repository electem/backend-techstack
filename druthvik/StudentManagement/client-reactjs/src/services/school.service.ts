import http from "../http-common";
import ISchoolData from "../types/school.types";

class SchoolDataService {
  getAllSchools() {
    return http.get("/school");
  }
  createSchool(school: ISchoolData) {
    return http.post<ISchoolData>("/school", school);
  }
  getSchoolById(id: string) {
    return http.get<ISchoolData>(`/school/${id}`);
  }
  updateStudent(school: ISchoolData, id: number) {
    return http.put<ISchoolData>(`/school/${id}`, school);
  }
  deleteSchool(id: number) {
    return http.delete(`/school/${id}`);
  }
}

export default new SchoolDataService();
