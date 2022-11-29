/* eslint-disable */
import http from "@/http-Studentcommon";

class SchoolDataService {
  async getAllSchool() {
    return await http.get("/school/all");
  }
  async getAllStudents() {
    return await http.get("/student");
  }
  getAllTeacherss() {
    return http.get("/teacher");
  }
  getAllSchoolPagination(pageNumber: number, pageSize: number) {
    return http.get(`/school?page=${pageNumber}&size=${pageSize}`);
  }
}

export default new SchoolDataService();
