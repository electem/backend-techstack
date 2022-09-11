import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Tutorial } from '../models/tutorial.model'
import { Category } from '../models/category'
import { Comment } from '../models/comment'
import { LoginUser } from '../models/login'
const baseUrl1 = 'http://localhost:8000/category'
const baseUrl2 = 'http://localhost:8000/tutorials'
const baseUrlComments = 'http://localhost:8000/comments'
const baseurllogin = 'http://localhost:8000/loginusers'


@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  

//   private categories:Category[]=[
//    {
//   "id": 1 , "title":"Raju" , "length":169
//    },
//    {
//   "id": 2 , "title":"Ramesh" , "length":170
//   },
//   {
//   "id": 3 , "title":"munja" , "length":150
//   }
// ]

  private country = [
   {
      "name":'INDIA'
      
    },
    {
      "name":'PAKISTAN'
    },
    {
      "name":'JAPAN'
    }
  ];

  private roles = [
    {
      "role":"Actor"
    },
    {
      "role":"comment"
    }]

    
createlogin(data: any): Promise<Object> {
return this.http.post(baseurllogin, data).toPromise();
}

getRole(){
    return this.roles
}
 
getCountryData(){
    return this.country;
  }

  constructor(private http: HttpClient) {}

  createComment(data: any): Promise<Object> {
    return this.http.post(baseUrlComments, data).toPromise();
  }

  async getcomment(id: number){
    return await this.http.get(`${baseUrlComments}/${id}`).toPromise();
  }
 
  async getAllCategory(): Promise<Category[]> {
      return await this.http.get<Category[]>(baseUrl1).toPromise();
  }

  async getCategoryById(id: number): Promise<Category[]> {
    return await this.http.get<Category[]>(baseUrl1).toPromise();
  }
  
  async getAll(): Promise<Tutorial[]>{
    return await this.http.get<Tutorial[]>(baseUrl2).toPromise();
  }

  async getTutor(id: Number): Promise<Tutorial> {
    return await this.http.get(`${baseUrl2}/${id}`).toPromise();
  }

 getbyId(id: Number) {
  return this.http.get(`${baseUrl2}/${id}`).toPromise();
}

 createTutorial(data: any): Promise<Object> {
  return this.http.post(baseUrl2, data).toPromise();
}

   create(data: any): Observable<any> {
    return this.http.post(baseUrl2, data)
   }

   async update(data: any) {
    return this.http.put(baseUrl2, data).toPromise();
  }

  async  deleteid(id: any){
    return this.http.delete(`${baseUrl2}/${id}`).subscribe();
  }

  deleteAll(id: any) {
    return this.http.delete(baseUrl2).toPromise();
  }

  // findByTitle(title: any): Observable<Tutorial[]> {
  //   return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`)
  // }
 }
