import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Company } from '../models/company.model';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';
const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  file = File;
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
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('tokens'),
    });
    console.log(localStorage.getItem('tokens'));
    return await this.http
      .get<Company[]>(baseUrl + '/company', { headers: reqHeader })
      .toPromise();
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

  downloadFile(file: File) {
    return this.http.get(`${baseUrl + '/photos'}/${file.name}`, {
      observe: 'response',
    });
  }

  async sendEmailById(id: number): Promise<Department> {
    return await this.http
      .post(`${baseUrl + '/company'}/${id}`, null)
      .toPromise();
  }

  // this block of code is used to upload file and download both database and folder

  // async uploadFile(file: File): Promise<File> {
  //   const formData: FormData = new FormData();
  //   formData.append('image', file);
  //   return await this.http
  //     .post<File>(baseUrl + '/photos', formData)
  //     .toPromise();
  // }
  // downloadFile(file: File) {
  //   return this.http.get(`${baseUrl + '/photos'}/${file.name}`, {
  //     observe: 'response',
  //     responseType: 'blob',
  //   });
  // }
}
