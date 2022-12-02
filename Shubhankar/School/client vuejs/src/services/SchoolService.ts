/* eslint-disable */
import http from "@/http-common";
import School from "@/types/School";

class SchoolService {

   async getAllSchool(){
      return await http.get("/school/all");
      } 

      createSchool(data : School) {
        return http.post("/school",data);
      }  

     getSchoolbyId(id: number) {
     return http.get(`/school/${id}`);
    }

   async  updateSchool(data:School): Promise<School> {
      return await http.put("/school",data);
    } 
    
  async  deleteSchool(id:number){
      return await http.delete(`/school/${id}`);
    }

  async getPaginatedSchool(page:number, limit:number,search:string){
  return await http.get(`/school?page=${page}&size=${limit}&search=${search}`);
  } 
}

export default new SchoolService();