import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { School } from '../models/school';
import { Student } from '../models/student';
import { Teacher } from '../models/teacher';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
 
schools:School[]=[];
teachers:Teacher[]=[];
students:Student[]=[];
genders: string[] = ['MALE', 'FEMALE'];

  constructor(private http: HttpClient) { }
  
  getGenderData() {
    return this.genders;
  }
  async getSchool(): Promise<School[]> {
    return await this.http.get<School[]>(url + '/schools').toPromise();
  }
  async createNewSchool(school: School) {
    return await this.http.post(url + '/addSchools', school).toPromise();
  }
  async getTeachers(): Promise<Teacher[]> {
    return await this.http.get<Teacher[]>(url + '/teachers').toPromise();
  }
  async getStudents(): Promise<Student[]> {
    return await this.http.get<Student[]>(url + '/students').toPromise();
  }
  async createNewTeacher(teacher: Teacher) {
    return await this.http.post(url + '/addTeacher', teacher).toPromise();
  }
}
