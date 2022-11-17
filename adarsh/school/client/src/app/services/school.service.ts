import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pagination } from '../models/pagination';
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
pagination = new Pagination();

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
 
  async createNewTeacher(teacher: Teacher) {
    return await this.http.post(url + '/addTeachers', teacher).toPromise();
  }
  async createNewStudent(student: Student) {
    return await this.http.post(url + '/addStudents', student).toPromise();
  }
  async getSchoolByID(id: number) {
    return await this.http.get(`${url + '/school'}/${id}`).toPromise();
  }
  async getStudentByID(id: number) {
    return await this.http.get(`${url + '/student'}/${id}`).toPromise();
  }
  async getTeacherByID(id: number) {
    return await this.http.get(`${url + '/teacher'}/${id}`).toPromise();
  }
  async updateSchool(id: number, school: School): Promise<School> {
    return await this.http
      .put(`${url + '/updateSchool'}/${id}`, school)
      .toPromise();
  }
  async updateTeacher(id: number, teacher: Teacher): Promise<Teacher> {
    return await this.http
      .put(`${url + '/updateTeachers'}/${id}`, teacher)
      .toPromise();
  }
  async updateStudent(id: number, student: Student): Promise<Student> {
    return await this.http
      .put(`${url + '/updateStudents'}/${id}`, student)
      .toPromise();
  }
  async getStudents(): Promise<Student[]> {
    return await this.http.get<Student[]>(url + '/students').toPromise();
  }
  public getFiles(file: File) {
    return this.http.get(url + 'downloadFile/' + file.name, {
      observe: 'response',
      responseType: 'blob',
    });
  }
}
