/* eslint-disable prettier/prettier */
import http from "@/http-common";
import Teacher from "@/types/Teacher";

class TeacherService {

    getAllTeachers(): Promise<any> {
        return http.get("/teacher");
      }  

      createTeacher(data: any): Promise<any> {
        return http.post("/teacher",data);
      }  
}

export default new TeacherService();