import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company';
import { Department } from '../models/depertment';
import { LoginUser } from '../models/ligin-user';

const url = environment.url;
const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companys: Company[] = [];
  department: Department[] = [];
  tokenIs?: string;
  

  constructor(private http: HttpClient) { }

  async getCompanys(): Promise<Company[]> {
    return await this.http.get<Company[]>(url + '/company').toPromise();
  }
  async createNewCompany(company: Company) {
    return await this.http.post(url + '/createCompany', company).toPromise();
  
  }
  async createNewDepartmement(department: Department) {
    return await this.http.post(url + '/createDepartment', department).toPromise();
  
  }
  async getDepertments(): Promise<Department[]> {
    return await this.http.get<Department[]>(url + '/depertment').toPromise();
  }
 
  async getCompanyByID(id: number) {
    return await this.http.get(`${url + '/company'}/${id}`).toPromise();
  }
  async updateCompany(id: number, company: Company): Promise<Company> {
    return await this.http
      .put(`${url + '/updateCompany'}/${id}`, company)
      .toPromise();
  }
  async updateDepartment(id: number, department: Department): Promise<Company> {
    return await this.http
      .put(`${url + '/updateDepartment'}/${id}`, department)
      .toPromise();
  }
  async getDepartmentByID(id: number) {
    return await this.http.get(`${url + '/depertment'}/${id}`).toPromise();
  }
  async deleteCompany(id: number): Promise<Company> {
    return await this.http
      .delete(`${url + '/company'}/${id}`)
      .toPromise();
  }
  async getAthontication() {
    return await this.http
      .post( AUTH_API + 'signin', {
        

      })
      .toPromise();
}
}
