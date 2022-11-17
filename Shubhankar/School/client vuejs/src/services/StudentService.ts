/* eslint-disable */
import http from "@/http-common";


class StudentService {

    getAllStudents(): Promise<any> {
        return http.get("/student");
      }  
}

export default new StudentService();