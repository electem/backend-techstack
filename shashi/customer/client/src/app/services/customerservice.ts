import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from '../models/userRegistration.model';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';
import { CustomerGroup } from '../models/customerGroup.model';
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
  async getCustomers(): Promise<Customer[]> {
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
  async getCustomerGroups(): Promise<CustomerGroup[]> {
    return await this.http
      .get<CustomerGroup[]>(baseUrl + '/customergroup')
      .toPromise();
  }
  async createCustomerGroup(
    customerGroupData: CustomerGroup
  ): Promise<CustomerGroup> {
    return this.http
      .post<CustomerGroup>(baseUrl + '/customergroup', customerGroupData)
      .toPromise();
  }
  async getCustomerGroupById(id: number): Promise<CustomerGroup> {
    return await this.http
      .get(`${baseUrl + '/customergroup'}/${id}`)
      .toPromise();
  }
  async updateCustomerGroup(
    customerGroup: CustomerGroup
  ): Promise<CustomerGroup> {
    return await this.http
      .put(baseUrl + '/customergroup', customerGroup)
      .toPromise();
  }
  async deleteCustomerGroupById(id: number): Promise<CustomerGroup> {
    return await this.http
      .delete(`${baseUrl + '/customergroup'}/${id}`)
      .toPromise();
  }
}
