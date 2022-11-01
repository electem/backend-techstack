import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company.model';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  async createCompany(company: Company): Promise<Company> {
    return await this.http
      .post<Company>(baseUrl + 'createCompany', company)
      .toPromise();
  }

  async getCompanies(): Promise<Company[]> {
    return await this.http.get<Company[]>(baseUrl + 'companies').toPromise();
  }
}
