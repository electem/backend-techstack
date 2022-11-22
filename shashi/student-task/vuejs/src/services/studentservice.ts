/* eslint-disable */

import http from "@/http-Studentcommon";
//const baseUrl = "http://localhost:3000";

class SchoolDataService {
  async getAll(): Promise<any> {
    return await http.get("/school");
  }
  getAllStudents(): Promise<any> {
    return http.get("/student");
  }
  getAllTeacherss(): Promise<any> {
    return http.get("/teacher");
  }

  createSchool(data: any): Promise<any> {
    return http.post("/school", data);
  }
  createStudent(data: any): Promise<any> {
    return http.post("/student", data);
  }
  createTeacher(data: any): Promise<any> {
    return http.post("/teacher", data);
  }
  getSchoolById(id: any): Promise<any> {
    return http.get(`/school/${id}`);
  }
  updateSchool(data: any): Promise<any> {
    return http.put(`/school/`, data);
  }
  getStudentById(id: any): Promise<any> {
    return http.get(`/student/${id}`);
  }
  updateStudent(data: any): Promise<any> {
    return http.put(`/student/`, data);
  }
  getTeacherById(id: any): Promise<any> {
    return http.get(`/teacher/${id}`);
  }
  updateTeacher(data: any): Promise<any> {
    return http.put(`/teacher/`, data);
  }
  deleteSchool(id: any): Promise<any> {
    return http.delete(`/school/${id}`);
  }
  deleteStudent(id: any): Promise<any> {
    return http.delete(`/student/${id}`);
  }
  deleteTeacher(id: any): Promise<any> {
    return http.delete(`/teacher/${id}`);
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
