import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { School } from '../models/school.model';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private http: HttpClient) {}

  async createSchool(school: School): Promise<School> {
    return await this.http
      .post<School>(baseUrl + 'createSchool', school)
      .toPromise();
  }

  async getSchools(): Promise<School[]> {
    return await this.http.get<School[]>(baseUrl + 'schools').toPromise();
  }
}
