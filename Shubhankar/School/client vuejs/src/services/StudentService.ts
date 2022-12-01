/* eslint-disable */
import http from "@/http-common";
import Student from "@/types/Student";

class StudentService {

  async  getAllStudents() {
        return await http.get("/student");
      }  

      createStudent(data: any) {
        return http.post("/student",data);
      }  

      getStudentbyId(id: number) {
        return http.get(`/student/${id}`);
       }

      async updateStudent(data: any): Promise<Student> {
        return await http.put("/student",data);
      }  

     async deleteStudent(id:number){
        return await http.delete(`/student/${id}`);
      }
}

export default new StudentService();