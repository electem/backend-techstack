import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';
import { CustomerGroup } from '../models/customer-group.model';

const baseUrl = environment.url;
export class Status {
  name?: string;
}
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private status: Status[] = [{ name: 'active' }, { name: 'inactive' }];

  constructor(private http: HttpClient) {}

  getStatus() {
    return this.status;
  }

  async createUser(user: User): Promise<User> {
    return await this.http.post<User>(baseUrl + 'createUser', user).toPromise();
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    return await this.http
      .post<Customer>(baseUrl + 'createCustomer', customer)
      .toPromise();
  }

  async getCustomers(): Promise<Customer[]> {
    return await this.http.get<Customer[]>(baseUrl + 'customers').toPromise();
  }

  async createCustomerGroup(
    customerGroup: CustomerGroup
  ): Promise<CustomerGroup> {
    return await this.http
      .post<CustomerGroup>(baseUrl + 'createCustomerGroup', customerGroup)
      .toPromise();
  }

  async getCustomerGroupList(): Promise<CustomerGroup[]> {
    return await this.http
      .get<CustomerGroup[]>(baseUrl + 'customerGroups')
      .toPromise();
  }

  async getCustomerGroupById(id: number) {
    return await this.http
      .get(`${baseUrl + 'customerGroup'}/${id}`)
      .toPromise();
  }

  async getCustomerById(id: number) {
    return await this.http.get(`${baseUrl + 'customer'}/${id}`).toPromise();
  }
}
