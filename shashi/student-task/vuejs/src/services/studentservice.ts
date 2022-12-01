/* eslint-disable */
import http from "@/http-Studentcommon";
//const baseUrl = "http://localhost:3000";
import { Student } from "@/types/student";
import School from "@/types/school";
import { Teacher } from "@/types/teacher";

class SchoolDataService {
  async getAllSchool() {
    return await http.get("/school");
  }
  async getAllStudents() {
    return await http.get("/student");
  }
  getAllTeacherss() {
    return http.get("/teacher");
  }
  createSchool(schoolData) {
    return http.post("/school", schoolData);
  }
  // async createSchool(schoolData: School): Promise<School> {
  //   const response = await http.post("/school", schoolData);
  //   return response.data;
  // }
  createStudent(studentData) {
    return http.post("/student", studentData).then();
  }
  async createTeacher(teacherData): Promise<Teacher> {
    return await http.post("/teacher", teacherData);
  }
  async getSchoolById(id: number) {
    return await http.get(`/school/${id}`);
  }
  async updateSchool(schoolData): Promise<School> {
    return await http.put(`/school/`, schoolData);
  }
  async getStudentById(id: number) {
    return await http.get(`/student/${id}`);
  }
  async updateStudent(studentData): Promise<Student> {
    return await http.put(`/student/`, studentData);
  }
  async getTeacherById(id: number) {
    return await http.get(`/teacher/${id}`);
  }
  async updateTeacher(teacherData): Promise<Teacher> {
    return await http.put(`/teacher/`, teacherData);
  }
  async deleteSchool(id: number): Promise<School> {
    return await http.delete(`/school/${id}`);
  }
  async deleteStudent(id: number): Promise<Student> {
    return await http.delete(`/student/${id}`);
  }
  async deleteTeacher(id: number): Promise<Teacher> {
    return await http.delete(`/teacher/${id}`);
  }
  async uploadFile(file: File) {
    let formData = new FormData();
    formData.append("file", file);
    return await http
      .post("/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function () {
        console.log("SUCCESS!!");
      })
      .catch(function () {
        console.log("FAILURE!!");
      });
  }
}

export default new SchoolDataService();
