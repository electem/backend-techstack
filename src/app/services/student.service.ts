import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '@app/models/student.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private  courseUrl ='http://localhost:8080/api/course/get/all';
  private  baseUrl = 'http://localhost:8080/api/add-student/1';
  constructor(private http: HttpClient) { }
  //get course
  getCource()
  {
    const data= this.http.get(`${this.courseUrl}`);
    return data;
  }
  //save employee
  create(data: any): Observable<Student> {
    return this.http.post(`${this.baseUrl}`, data);
  }
}
