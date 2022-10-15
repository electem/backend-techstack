import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';

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

  async createCustomer(customer: Customer): Promise<User> {
    return await this.http
      .post<Customer>(baseUrl + 'createCustomer', customer)
      .toPromise();
  }
}
