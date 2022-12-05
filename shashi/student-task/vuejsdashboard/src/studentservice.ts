/* eslint-disable */
import http from "@/http-Studentcommon";
import School from "./types/school";
import SchoolDelete from "./types/schooldelete";

class SchoolDataService {
  schoolDelete = {} as SchoolDelete;

  async getAllSchool() {
    return await http.get("/school/all");
  }
  createSchool(schoolData: School) {
    return http.post("/school", schoolData);
  }
  async getAllStudents() {
    return await http.get("/student");
  }
  async getSchoolById(id: string | string[]) {
    return await http.get(`/school/${id}`);
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
  async updateSchool(schoolData: School): Promise<School> {
    return await http.put(`/school/`, schoolData);
  }
}

export default new SchoolDataService();
