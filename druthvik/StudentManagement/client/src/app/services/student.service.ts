import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Student } from '../models/student.model';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  async getStudents(): Promise<Student[]> {
    return this.http.get<Student[]>(baseUrl + '/student').toPromise();
  }

  async createStudent(createstudent: Student): Promise<Student> {
    return await this.http
      .post<Student>(baseUrl + '/student', createstudent)
      .toPromise();
  }

  async getStudentById(id: number) {
    return await this.http
      .get<Student>(`${baseUrl + '/student'}/${id}`)
      .toPromise();
  }

  async updateStudent(updatestudent: Student) {
    return await this.http
      .put<Student>(baseUrl + '/student', updatestudent)
      .toPromise();
  }
}
