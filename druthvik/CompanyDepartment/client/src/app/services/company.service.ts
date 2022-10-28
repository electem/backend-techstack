import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Company } from '../models/company.model';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  async createCompany(createcompany: Company): Promise<Company> {
    return await this.http
      .post<Company>(baseUrl + '/company', createcompany)
      .toPromise();
  }
  async getCompanies(): Promise<Company[]> {
    return await this.http.get<Company[]>(baseUrl + '/company').toPromise();
  }

  async getCompanyById(id: number) {
    return await this.http.get(`${baseUrl + '/company'}/${id}`).toPromise();
  }
  async updateCompany(updatecompany: Company) {
    return await this.http
      .put<Company>(baseUrl + '/company', updatecompany)
      .toPromise();
  }

  async deletCompanyById(id: number) {
    return await this.http.delete(`${baseUrl + '/company'}/${id}`).toPromise();
  }
}
