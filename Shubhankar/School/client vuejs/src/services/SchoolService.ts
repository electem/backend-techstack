/* eslint-disable */
import http from "@/http-common";
import School from "@/types/School";

class SchoolService {

   async getAllSchool(){
      return await http.get("/school");
      } 

      createSchool(data : any) {
        return http.post("/school",data);
      }  

     getSchoolbyId(id: number) {
     return http.get(`/school/${id}`);
    }

   async  updateSchool(data: any): Promise<School> {
      return await http.put("/school",data);
    } 
    
  async  deleteSchool(id:number){
      return await http.delete(`/school/${id}`);
    }
}

export default new SchoolService();