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
  async createSchool(schoolData: School): Promise<School> {
    return this.http.post<School>(baseUrl + '/school', schoolData).toPromise();
  }
}
