/* eslint-disable */

import http from "@/http-Studentcommon";
//const baseUrl = "http://localhost:3000";

class SchoolDataService {
  getAll(): Promise<any> {
    return http.get("/school");
  }
  getAllStudents(): Promise<any> {
    return http.get("/student");
  }
  getAllTeacherss(): Promise<any> {
    return http.get("/teacher");
  }
  //   get(id: any): Promise<any> {
  //     return http.get(`/tutorials/${id}`);
  //   }

  create(data: any): Promise<any> {
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
  //   update(id: any, data: any): Promise<any> {
  //     return http.put(`/tutorials/${id}`, data);
  //   }

  //   delete(id: any): Promise<any> {
  //     return http.delete(`/tutorials/${id}`);
  //   }

  //   deleteAll(): Promise<any> {
  //     return http.delete(`/tutorials`);
  //   }

  findByTitle(schoolname: string): Promise<any> {
    return http.get(`/school?schoolname=${schoolname}`);
  }
}

export default new SchoolDataService();
