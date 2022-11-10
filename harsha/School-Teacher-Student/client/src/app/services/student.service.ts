import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student.model';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  genders: string[] = ['Male', 'Female'];
  constructor(private http: HttpClient) {}

  async getStudents(): Promise<Student[]> {
    return await this.http.get<Student[]>(baseUrl + 'students').toPromise();
  }

  async createStudent(student: Student): Promise<Student> {
    return await this.http
      .post<Student>(baseUrl + 'createStudent', student)
      .toPromise();
  }
  async getGender() {
    return await this.genders;
  }
}
