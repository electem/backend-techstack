import http from "../http-common";
import { School } from "../types/school.type";

class SchoolService {
  getSchools() {
    return http.get<Array<School>>("/schools");
  }
}

export default new SchoolService();
