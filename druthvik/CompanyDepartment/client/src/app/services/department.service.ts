import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Department } from '../models/department.model';
const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  async createDepartment(createdepartment: Department): Promise<Department> {
    return await this.http
      .post<Department>(baseUrl + '/department', createdepartment)
      .toPromise();
  }
}
