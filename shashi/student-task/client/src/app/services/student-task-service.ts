import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { School } from '../models/school.model';
import { Teacher } from '../models/teacher.model';
import { Student } from '../models/student.model';
const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private http: HttpClient) {}
  async createSchool(schoolData: School): Promise<School> {
    return this.http.post<School>(baseUrl + '/school', schoolData).toPromise();
  }
  async getTeachers(): Promise<Teacher[]> {
    return await this.http.get<Teacher[]>(baseUrl + '/teacher').toPromise();
  }
  async getStudents(): Promise<Student[]> {
    return await this.http.get<Student[]>(baseUrl + '/student').toPromise();
  }
  async getSchools(): Promise<School[]> {
    return await this.http.get<School[]>(baseUrl + '/school').toPromise();
  }
}
