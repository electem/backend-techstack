/* eslint-disable */

import http from "@/http-Studentcommon";
import School from "@/types/school";
import { Student } from "@/types/student";
import { Teacher } from "@/types/teacher";
//const baseUrl = "http://localhost:3000";

class SchoolDataService {
  
  getAllStudents() {
    return http.get("/students");
  }

  getStudent(id: number) {
    return http.get(`/student/${id}`);
  }

  createStudent(data: Student) {
    return http.post("/addStudents", data);
  }

  getAllSchools() {
    return http.get("/schools");
  }

  getSchool(id: number) {
    return http.get(`/school/${id}`);
  }

  createSchool(data: School) {
    return http.post("/addSchools", data);
  }
  getAllTeachers() {
    return http.get("/teachers");
  }

  getTeacher(id: number) {
    return http.get(`/teacher/${id}`);
  }
  createTeacher(data: Teacher) {
    return http.post("/addTeachers", data);
  }
  updateStudent(id: number, data: Student) {
    return http.put(`/updateStudent/${id}`, data);
  }
  updateSchool(id: number, data: School) {
    return http.put(`/updateSchool/${id}`, data);
  }
  updateTeacher(id: number, data: Teacher) {
    return http.put(`/updateTeachers/${id}`, data);
  }
  uploadFile(file: File) {
    let formData = new FormData();
    formData.append("file", file);
    return http
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

  //   deleteAll(): Promise<any> {
  //     return http.delete(`/tutorials`);
  //   }

  findByTitle(schoolname: string): Promise<any> {
    return http.get(`/school?schoolname=${schoolname}`);
  }
}

export default new SchoolDataService();
