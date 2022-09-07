import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Course } from '../models/Course'

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseUrl = 'http://localhost:8080/api/tutorials'
  constructor(private http: HttpClient) {}

  private courses: Course[] = [
    {
      course1: 'urdu',
      course2: 'Language'
    },
    { 
      course1:  'Mba',
      course2: 'B.Tech'
    },
    {
      course1: 'Civil',
      course2: 'ItI'
    },
    {
     course1: 'mechanical',
      course2: 'It'
    }
    ];

  getCourse(){
      return this.courses;
    }
  
  
   
  addUser(courses: Course) {
    
      this.courses.push(courses);
    }
  updateUser(courses: Course) {
      const index = this.courses.findIndex(u => courses.course1 === u.course1);
      this.courses[index] = courses;
    }
  deleteUser(courses: Course): void {
      this.courses.splice(this.courses.indexOf(courses), 1);
    }
 
  save(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data)
  }

  getAllStudentlist(): Observable<any> {
    return this.http.get(this.baseUrl)
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data)
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
