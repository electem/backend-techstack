/* eslint-disable */
import http from "@/http-common";


class SchoolService {

    getAllSchool(): Promise<any> {
        return http.get("/school");
      } 

      createSchool(data: any): Promise<any> {
        return http.post("/school",data);
      }  

     getSchoolbyId(id: any) {
     return http.get(`/school/${id}`);
    }

    updateSchool(data: any): Promise<any> {
      return http.put("/school",data);
    } 
    
    deleteSchool(id:any){
      return http.delete(`/school/${id}`);
    }
}

export default new SchoolService();