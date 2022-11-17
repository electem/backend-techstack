/* eslint-disable prettier/prettier */
import http from "@/http-common";

class TeacherService {

    getAllTeachers(): Promise<any> {
        return http.get("/teacher");
      }  
}

export default new TeacherService();