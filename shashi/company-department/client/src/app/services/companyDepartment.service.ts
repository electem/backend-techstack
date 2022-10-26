import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Company } from '../models/company.model';
import { Department } from '../models/department.model';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}
  async createCompany(companyData: Company): Promise<Company> {
    return this.http
      .post<Company>(baseUrl + '/company', companyData)
      .toPromise();
  }
  async createDepartment(departmentData: Department): Promise<Department> {
    return this.http
      .post<Department>(baseUrl + '/department', departmentData)
      .toPromise();
  }
  async getCompanies(): Promise<Company[]> {
    return await this.http.get<Company[]>(baseUrl + '/company').toPromise();
  }
}
