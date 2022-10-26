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
  async createCompany(companyData: Company): Promise<Company> {
    return this.http
      .post<Company>(baseUrl + '/company', companyData)
      .toPromise();
  }
}
