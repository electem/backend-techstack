import http from "../http-common";
import ISchoolData from "../types/school.types";

class SchoolDataService {
  getAll() {
    return http.get<Array<ISchoolData>>("/school");
  }
  create(school: ISchoolData) {
    return http.post<ISchoolData>("/school", school);
  }
  get(id: string) {
    return http.get<ISchoolData>(`/school/${id}`);
  }
  update(data: ISchoolData, id: any) {
    return http.put<any>(`/school/`, data);
  }
}

export default new SchoolDataService();
