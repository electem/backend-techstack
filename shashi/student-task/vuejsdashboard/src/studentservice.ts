/* eslint-disable */
import http from "@/http-Studentcommon";
import SchoolDelete from "./types/schooldelete";

class SchoolDataService {
  schoolDelete = {} as SchoolDelete;

  async getAllSchool() {
    return await http.get("/school/all");
  }
  async getAllStudents() {
    return await http.get("/student");
  }
  getAllTeacherss() {
    return http.get("/teacher");
  }
  getAllSchoolPagination(
    pageNumber: number,
    pageSize: number,
    seachedString: string
  ) {
    return http.get(
      `/school?page=${pageNumber}&size=${pageSize}&search=${seachedString}`
    );
  }
  async deleteSelectedSchool(ids: number[]) {
    this.schoolDelete.ids = ids;
    return await http.delete("/school/", { data: this.schoolDelete });
  }
  async deleteSchool(id: number) {
    return await http.delete(`/school/${id}`);
  }
}

export default new SchoolDataService();
