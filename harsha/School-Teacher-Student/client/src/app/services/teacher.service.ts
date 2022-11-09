import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Teacher } from '../models/teacher.model';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  async getTeachers(): Promise<Teacher[]> {
    return await this.http.get<Teacher[]>(baseUrl + 'teachers').toPromise();
  }

  async createTeacher(teacher: Teacher): Promise<Teacher> {
    return await this.http
      .post<Teacher>(baseUrl + 'createTeacher', teacher)
      .toPromise();
  }
}
