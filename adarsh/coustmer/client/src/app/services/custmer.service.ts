import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customar } from '../models/customer';
import { CustomarGroup } from '../models/customergroup';
import { User } from '../models/user.model';

const url = environment.url;
export class Status {
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustmerService {
  users: User[] = [];
  customers: Customar[] =[];
  customerGroupa: CustomarGroup[] =[];
  private status:Status[]= [
    { name: 'Active' },
    { name: 'Non Active' },
  ]

  constructor(private http: HttpClient) { }

  async createNewUser(user: User) {
    return await this.http.post(url + '/addUser', user).toPromise();
  }
  async createNewCustomer(customer: Customar) {
    return await this.http.post(url + '/addCustomers', customer).toPromise();
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
  async updateCustomer(custmer: Customar): Promise<Customar> {
    return await this.http.put(url + '/updatePanel', custmer).toPromise();
  }
  async getCustomerByID(id: number) {
    return await this.http.get(`${url + '/customer'}/${id}`).toPromise();
  }
  async getCustomerGroup(): Promise<CustomarGroup[]> {
    return await this.http.get<CustomarGroup[]>(url + '/customerGroup').toPromise();
  }
  
  async createCustomerGroup(customerGroup: CustomarGroup) {
    return await this.http.post(url + '/addCustomerGroup', customerGroup).toPromise();
  }
}
