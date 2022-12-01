/* eslint-disable prettier/prettier */
import http from "@/http-common";
import Teacher from "@/types/Teacher";

class TeacherService {

  async  getAllTeachers() {
        return http.get("/teacher");
      }  

      createTeacher(data: any){
        return http.post("/teacher",data);
      }  

    async  updateTeacher(data: any): Promise<Teacher> {
        return await http.put("/teacher",data);
      } 
      
      createTeacherbyId(id: number) {
        return http.get(`/teacher/${id}`);
       }

    async   deleteTeacher(id:number){
        return await http.delete(`/teacher/${id}`);
      }
}

export default new TeacherService();