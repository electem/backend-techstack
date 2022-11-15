import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { School } from '../models/school.model';
import { Teacher } from '../models/teacher.model';
import { Student } from '../models/student.model';
const baseUrl = environment.url;

export class Gender {
  name!: string;
}

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  genderList: string[] = ['male', 'female', 'others'];
  constructor(private http: HttpClient) {}

  async genderListmethod() {
    this.genderList;
  }
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
  async createTeacher(teacherData: Teacher): Promise<Teacher> {
    return this.http
      .post<Teacher>(baseUrl + '/teacher', teacherData)
      .toPromise();
  }
  async createStudent(studentData: Student): Promise<Student> {
    return this.http
      .post<Student>(baseUrl + '/student', studentData)
      .toPromise();
  }
  async uploadFile(file: File) {
    const headerDict = {
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    const formData = new FormData();
    formData.append('image', file);
    return await this.http
      .post(baseUrl + '/photos', formData, requestOptions)
      .subscribe();
  }

  downloadFile(file: File) {
    return this.http.get(`${baseUrl + '/photos'}/${file.name}`, {
      observe: 'response',
      responseType: 'blob',
    });
  }
  async getSchoolById(id: number): Promise<School> {
    return this.http.get<School>(`${baseUrl + '/school'}/${id}`).toPromise();
  }

  async updateSchool(school: School): Promise<School> {
    return await this.http.put<School>(baseUrl + '/school', school).toPromise();
  }
  async getStudentById(id: number): Promise<Student> {
    return this.http.get<Student>(`${baseUrl + '/student'}/${id}`).toPromise();
  }
  async updateStudent(student: Student): Promise<Student> {
    return await this.http
      .put<Student>(baseUrl + '/student', student)
      .toPromise();
  }
  async getTeacherById(id: number): Promise<Teacher> {
    return await this.http
      .get<Teacher>(`${baseUrl + '/teacher'}/${id}`)
      .toPromise();
  }
  async updateTeacher(teacher: Teacher): Promise<Teacher> {
    return await this.http
      .put<Teacher>(baseUrl + '/teacher', teacher)
      .toPromise();
  }
  async deleteSchoolById(id: number): Promise<School> {
    return await this.http
      .delete<School>(`${baseUrl + '/school'}/${id}`)
      .toPromise();
  }
  async deleteStudentById(id: number): Promise<Student> {
    return await this.http
      .delete<Student>(`${baseUrl + '/student'}/${id}`)
      .toPromise();
  }
  async deleteTeacherById(id: number): Promise<Teacher> {
    return await this.http
      .delete<Teacher>(`${baseUrl + '/teacher'}/${id}`)
      .toPromise();
  }
}
