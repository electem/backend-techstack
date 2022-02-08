import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '@app/models/student.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private  courseUrl = 'http://localhost:8080/api/course/get/all';
  private  baseUrl = 'http://localhost:8080/api/add-student/1';
  private  logIn = 'http://localhost:8080/api/logIn';
  private   semester = 'http://localhost:8080/student/semester/get/all';
  private getCourseById = 'http://localhost:8080/api/course/1';
  constructor(private http: HttpClient) { }
  // get course
  getCource()
  {
    const data = this.http.get(`${this.courseUrl}`);
    return data;
  }
  // save employee
  create(data: any): Observable<Student> {
    return this.http.post(`${this.baseUrl}`, data);
  }
  // Login
  login(data: any): Observable<any> {
    return this.http.post(`${this.logIn}`, data);
  }

  // get semster
  getSemester(): Observable<any> {
    return this.http.get(`${this.semester}`);
  }
  // get course by Id
  getCourceById(): Observable<any>
  {
    return  this.http.get(`${this.getCourseById}`);
  }
}
