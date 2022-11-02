import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Company } from '../models/company';
import { Department } from '../models/department';
import { environment } from '../../environments/environment';



const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async getCompany(): Promise<Company[]> {
    return  this.http.get<Company[]>(baseUrl + '/company').toPromise();
  }

  async getCompanys(): Promise<Company[]> {
    return  this.http.get<Company[]>(baseUrl + '/company').toPromise();
  }

 createcompany(data: Company): Promise<Company> {
    return this.http.post<Company>(baseUrl + '/company', data).toPromise();
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
  async getDepartmentById(id: number): Promise<Department> {
    return await this.http.get(`${baseUrl + '/department'}/${id}`).toPromise();
  }

  async updateCompany(data: Company) {
    return this.http.put<Company>(baseUrl + '/company', data).toPromise();
  }

  async getDepartments(): Promise<Department[]> {
    return  this.http.get<Department[]>(baseUrl + '/department').toPromise();
  }
}
