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

      updateTeacher(data: any): Promise<any> {
        return http.put("/teacher",data);
      } 
      
      createTeacherbyId(id: any) {
        return http.get(`/teacher/${id}`);
       }

       deleteTeacher(id:any){
        return http.delete(`/teacher/${id}`);
      }
}

export default new TeacherService();