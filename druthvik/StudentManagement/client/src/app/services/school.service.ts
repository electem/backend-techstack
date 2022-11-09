import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { School } from '../models/school.model';
const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private http: HttpClient) {}

  async createSchool(createschool: School): Promise<School> {
    return await this.http
      .post<School>(baseUrl + '/school', createschool)
      .toPromise();
  }
  async getSchools(): Promise<School[]> {
    return this.http.get<School[]>(baseUrl + '/school').toPromise();
  }
  async getSchoolById(id: number) {
    return await this.http.get(`${baseUrl + '/school'}/${id}`).toPromise();
  }
  async updateSchool(updateschool: School) {
    return await this.http
      .put<School>(baseUrl + '/school', updateschool)
      .toPromise();
  }
}
