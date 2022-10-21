import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { createCustomer } from '../models/customer.model';

const baseUrl = environment.url;
const baseUrl2 = environment.url1;

export class Status {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class customerService {
  private status: Status[] = [
    { name: 'active' },
    { name: 'inactive' },
    { name: 'all' },
  ];
  constructor(private http: HttpClient) {}

  getStatus() {
    return this.status;
  }
  async createCustomer(
    createcustomer: createCustomer,
  ): Promise<createCustomer> {
    return await this.http
      .post<createCustomer>(baseUrl2 + '/customer', createcustomer)
      .toPromise();
  }

  async getCustomer(): Promise<createCustomer[]> {
    return await this.http
      .get<createCustomer[]>(baseUrl2 + '/customer')
      .toPromise();
  }

  async getCustomerById(id: number) {
    return await this.http.get(`${baseUrl2 + '/customer'}/${id}`).toPromise();
  }
  async updateCustomer(customer: createCustomer) {
    return await this.http.put(baseUrl2 + '/customer', customer).toPromise();
  }

  async deletCustomerById(id: number) {
    return await this.http
      .delete(`${baseUrl2 + '/customer'}/${id}`)
      .toPromise();
  }

  async getUnits(): Promise<createCustomer[]> {
    return await this.http
      .get<createCustomer[]>(baseUrl2 + '/units')
      .toPromise();
  }
}
