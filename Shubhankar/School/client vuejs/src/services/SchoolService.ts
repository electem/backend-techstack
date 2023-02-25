/* eslint-disable */
import http from "@/http-common";
import School from "@/types/School";
import schoolRemoved from "@/types/SchoolRemoved";

class SchoolService {

  deleteSchools = {} as schoolRemoved

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

 
  async  deleteselectedSchool(ids:number[]){
    this.deleteSchools.ids= ids;
    return await http.delete(`/school`,{data:this.deleteSchools});
  }
}

export default new SchoolService();
