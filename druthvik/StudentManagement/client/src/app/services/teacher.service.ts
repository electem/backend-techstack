import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Teacher } from '../models/teacher.model';

const baseUrl = environment.url;

export class Gender {
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private gender: Gender[] = [{ name: 'Male' }, { name: 'Female' }];
  constructor(private http: HttpClient) {}

  getGenders() {
    return this.gender;
  }

  async getTeachers(): Promise<Teacher[]> {
    return this.http.get<Teacher[]>(baseUrl + '/teacher').toPromise();
  }
  async createTeacher(createteacher: Teacher): Promise<Teacher> {
    return await this.http
      .post<Teacher>(baseUrl + '/teacher', createteacher)
      .toPromise();
  }
}
