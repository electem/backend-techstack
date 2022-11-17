/* eslint-disable */
import http from "@/http-common";


class SchoolService {

    getAllSchool(): Promise<any> {
        return http.get("/school");
      } 
      
      
}

export default new SchoolService();