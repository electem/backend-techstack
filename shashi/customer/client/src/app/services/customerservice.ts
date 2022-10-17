import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from '../models/userRegistration.model';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';
const baseUrl = environment.url;

export class Status {
  id?: number;
  name?: string;
}
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private status: Status[] = [
    { id: 1, name: 'active' },
    { id: 2, name: 'inactive' },
  ];
  constructor(private http: HttpClient) {}

  getStatus() {
    return this.status;
  }
  async createUser(userData: UserRegistration): Promise<UserRegistration> {
    return this.http
      .post<UserRegistration>(baseUrl + '/userregistration', userData)
      .toPromise();
  }
  async getCustomer(): Promise<Customer[]> {
    return await this.http.get<Customer[]>(baseUrl + '/customer').toPromise();
  }
  async createCustomer(customerData: Customer): Promise<Customer> {
    return this.http
      .post<Customer>(baseUrl + '/customer', customerData)
      .toPromise();
  }
  async getCustomerById(id: number): Promise<Customer> {
    return await this.http.get(`${baseUrl + '/customer'}/${id}`).toPromise();
  }
  async updateCustomer(customer: Customer): Promise<Customer> {
    return await this.http.put(baseUrl + '/customer', customer).toPromise();
  }
}
