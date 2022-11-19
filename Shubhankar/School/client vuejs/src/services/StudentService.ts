/* eslint-disable */
import http from "@/http-common";


class StudentService {

    getAllStudents(): Promise<any> {
        return http.get("/student");
      }  

      createStudent(data: any): Promise<any> {
        return http.post("/student",data);
      }  

      getStudentbyId(id: any) {
        return http.get(`/student/${id}`);
       }

       updateStudent(data: any): Promise<any> {
        return http.put("/student",data);
      }  

      deleteStudent(id:any){
        return http.delete(`/student/${id}`);
      }
}

export default new StudentService();