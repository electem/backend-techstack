import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company';
import { Department } from '../models/depertment';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companys: Company[] = [];
  department: Department[] = [];

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
  async updateCompany(custmer: Company): Promise<Company> {
    return await this.http.put(url + '/updateDepartment', custmer).toPromise();
  }
  async getCompanyByID(id: number) {
    return await this.http.get(`${url + '/company'}/${id}`).toPromise();
  }
}
