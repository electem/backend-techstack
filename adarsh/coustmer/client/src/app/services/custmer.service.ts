import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customar } from '../models/customer';
import { User } from '../models/user.model';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CustmerService {
  users: User[] = [];
  customers: Customar[] =[];
  private status = [
    { name: 'Active' },
    { name: 'Non Active' },
  ]

  constructor(private http: HttpClient) { }

  async createNewUser(user: User) {
    return await this.http.post(url + '/addUser', user).toPromise();
  }
  async createNewCustomer(customer: Customar) {
    return await this.http.post(url + '/addCustomersr', customer).toPromise();
  }
  getStatusData() {
    return this.status;
  }
  async getUsers(): Promise<User[]> {
    return await this.http.get<User[]>(url + '/Users').toPromise();
  }
  async getCustomer(): Promise<Customar[]> {
    return await this.http.get<Customar[]>(url + '/customers').toPromise();
  }

}
