import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { School } from '../models/school';
import { Teacher } from '../models/teacher';
import { Student } from '../models/student';

const baseUrl = environment.url;
export class Gender {
  name!: string;
}
@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private http: HttpClient) {}

  gender: Gender[] = [{ name: 'male' }, { name: 'female' }, { name: 'others' }];

  async genderList() {
    return await this.gender;
  }

  createSchool(data: School): Promise<School> {
    return this.http.post<School>(baseUrl + '/school', data).toPromise();
  }

  async getallSchools(): Promise<School[]> {
    return await this.http.get<School[]>(baseUrl + '/school').toPromise();
  }

  async getallTeachers(): Promise<Teacher[]> {
    return await this.http.get<Teacher[]>(baseUrl + '/teacher').toPromise();
  }

  async getallSchoolRecords(): Promise<School[]> {
    return await this.http.get<School[]>(baseUrl + '/school').toPromise();
  }

  async createTeacher(data: Teacher): Promise<Teacher> {
    return this.http.post<Teacher>(baseUrl + '/teacher', data).toPromise();
  }

  async createStudent(data: Student): Promise<Student> {
    return this.http.post<Student>(baseUrl + '/student', data).toPromise();
  }

  async getallStudents(): Promise<Student[]> {
    return await this.http.get<Student[]>(baseUrl + '/student').toPromise();
  }

  async getSchoolbyid(id: number): Promise<School> {
    return await this.http.get(`${baseUrl + '/school'}/${id}`).toPromise();
  }

  async updateSchool(school: School): Promise<School> {
    return await this.http.put<School>(baseUrl + '/school', school).toPromise();
  }

  async getTeacherbyid(id: number): Promise<Teacher> {
    return await this.http.get(`${baseUrl + '/teacher'}/${id}`).toPromise();
  }

  async updateTeacher(teacher: Teacher): Promise<Teacher> {
    return await this.http.put<School>(baseUrl + '/teacher', teacher).toPromise();
  }
}
