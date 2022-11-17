/* eslint-disable */
import http from "@/http-common";


class StudentService {

    getAllStudents(): Promise<any> {
        return http.get("/student");
      }  

      createStudent(data: any): Promise<any> {
        return http.post("/student",data);
      }  
}

export default new StudentService();