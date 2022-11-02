import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Company } from '../models/company.model';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';
const baseUrl = environment.url;
export class Pagination {
  startPoint?: number;
  pageLength?: number;
}
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  file = 'dnld.png';
  pagination = new Pagination();
  imageUrl =
    'E:/New Clone/backend-techstack/shashi/company-department/nestjs-server/uploads/';
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

  async getDepartments(): Promise<Department[]> {
    return await this.http
      .get<Department[]>(baseUrl + '/department')
      .toPromise();
  }
  async getCompanyById(id: number): Promise<Company> {
    return await this.http.get(`${baseUrl + '/company'}/${id}`).toPromise();
  }
  async getDepartmentById(id: number): Promise<Department> {
    return await this.http.get(`${baseUrl + '/department'}/${id}`).toPromise();
  }
  async updateCompany(company: Company): Promise<Company> {
    return await this.http
      .put<Company>(baseUrl + '/company', company)
      .toPromise();
  }
  async updateDepartment(departmentData: Department): Promise<Department> {
    return await this.http
      .put<Department>(baseUrl + '/department', departmentData)
      .toPromise();
  }
  async deleteCompanyById(id: number): Promise<Company> {
    return await this.http.delete(`${baseUrl + '/company'}/${id}`).toPromise();
  }
  async deleteDepartmentById(id: number): Promise<Department> {
    return await this.http
      .delete(`${baseUrl + '/department'}/${id}`)
      .toPromise();
  }
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(baseUrl + '/photos', formData).toPromise();
  }
  async downloadFile() {
    return await this.http
      .get(`${baseUrl + '/photos'}/${this.file}`)
      .toPromise();
  }
}
