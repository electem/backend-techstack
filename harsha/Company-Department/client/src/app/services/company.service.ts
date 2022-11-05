import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company.model';
import { Department } from '../models/department.model';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  token!: string;
  constructor(private http: HttpClient) {}

  async createCompany(company: Company): Promise<Company> {
    return await this.http
      .post<Company>(baseUrl + 'createCompany', company)
      .toPromise();
  }

  async getCompanies(): Promise<Company[]> {
    this.token = localStorage.getItem('id_token')!;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return await this.http
      .get<Company[]>(baseUrl + 'companies', { headers: header })
      .toPromise();
  }

  async getDepartments(): Promise<Department[]> {
    return await this.http
      .get<Department[]>(baseUrl + 'departments')
      .toPromise();
  }

  async createDepartment(department: Department): Promise<Department> {
    return await this.http
      .post<Department>(baseUrl + 'createDepartment', department)
      .toPromise();
  }

  async getCompanyById(id: number) {
    return await this.http.get(`${baseUrl + 'company'}/${id}`).toPromise();
  }

  async updateCompany(id: number, company: Company): Promise<Company> {
    return await this.http
      .put(`${baseUrl + 'updateCompany'}/${id}`, company)
      .toPromise();
  }

  async getDepartmentById(id: number) {
    return await this.http.get(`${baseUrl + 'department'}/${id}`).toPromise();
  }

  async updateDepartment(
    id: number,
    department: Department
  ): Promise<Department> {
    return await this.http
      .put(`${baseUrl + 'updateDepartment'}/${id}`, department)
      .toPromise();
  }

  async deleteCompany(id: number): Promise<Company> {
    return await this.http
      .delete(`${baseUrl + 'deleteCompany'}/${id}`)
      .toPromise();
  }
}
