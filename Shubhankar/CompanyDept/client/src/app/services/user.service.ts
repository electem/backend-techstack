import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Company } from '../models/company'
import { Department } from '../models/department'
const baseUrl = 'http://localhost:3000'
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  
 async getallCompany(): Promise<Company[]> {
    return await this.http.get<Company[]>(baseUrl + '/company').toPromise();
  }

  createcompany(data: Company): Promise<Company> {
    return this.http
      .post<Company>(baseUrl + '/company', data)
      .toPromise();
  }

  async getallDepartment(): Promise<Department[]> {
    return await this.http
      .get<Department[]>(baseUrl + '/department')
      .toPromise();
  }

  async createdepartment(departmentinfo: Department): Promise<Department> {
    return await this.http
      .post<Department>(baseUrl + '/department', departmentinfo)
      .toPromise();
  }

  async getCompanyById(id: number): Promise<Company> {
    return await this.http.get(`${baseUrl + '/company'}/${id}`).toPromise();
  }

  async updateCompany(data: Company, id: Number) {
    return this.http
      .put<Company>(`${baseUrl + '/company'}/${id}`, data)
      .toPromise();
  }
}
