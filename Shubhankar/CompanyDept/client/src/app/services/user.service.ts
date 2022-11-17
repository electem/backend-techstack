import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get<Company[]>(baseUrl + '/company').toPromise();
  }

  async getCompanys(): Promise<Company[]> {
    return this.http.get<Company[]>(baseUrl + '/company').toPromise();
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
    return this.http.get<Department[]>(baseUrl + '/department').toPromise();
  }

  async updateDepartment(data: Department) {
    return this.http.put<Department>(baseUrl + '/department', data).toPromise();
  }

  async uploadFile(file: File) {
    const headerDict = {
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    const formData = new FormData();
    formData.append('image', file);
    return await this.http
      .post(baseUrl + '/photos', formData, requestOptions)
      .subscribe();
  }

  downloadFile(file: File): any {
    return this.http.get(`${baseUrl + '/photos'}/${file.name}`, {
      observe: 'response',
      responseType: 'blob',
    });
  }

  deletecompany(id:number){
    return this.http.delete<Company>(`${baseUrl + '/company'}/${id}`).toPromise();
  }

  deleteDepartment(id:number){
    return this.http.delete<Department>(`${baseUrl + '/department'}/${id}`).toPromise();
  }
}
