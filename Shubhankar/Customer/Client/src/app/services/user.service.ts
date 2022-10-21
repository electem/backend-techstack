import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Register } from '../models/register';
import { Customer } from '../models/customer';
import { Customergroup } from '../models/customergroup';
import { Unit } from '../models/unit';

const baseUrl = environment.url;
export class Status {
  name?: string;
}
export class StatusFilter {
  name?: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private status: Status[] = [
    {
      name: 'Active',
    },
    {
      name: 'Inactive',
    },
  ];

  private getfiltercustomerstatus: StatusFilter[] = [
    {
      name: 'active',
    },
    {
      name: 'inactive',
    },
    {
      name: 'All',
    },
  ];

  getfilterstatus() {
    return this.getfiltercustomerstatus;
  }

  getstatus() {
    return this.status;
  }

  createlogin(data: Register): Promise<Register> {
    return this.http.post<Register>(baseUrl + '/loginusers', data).toPromise();
  }

  async getAll(): Promise<Customer[]> {
    return await this.http.get<Customer[]>(baseUrl + '/customer').toPromise();
  }
  createcustomer(data: Customer): Promise<Customer> {
    return this.http.post<Customer>(baseUrl + '/customer', data).toPromise();
  }

  async getcustomergroup(): Promise<Customergroup[]> {
    return await this.http
      .get<Customergroup[]>(baseUrl + '/customergroup')
      .toPromise();
  }

  createcustomergroup(data: Customergroup): Promise<Customergroup> {
    return this.http
      .post<Customergroup>(baseUrl + '/customergroup', data)
      .toPromise();
  }
  updatecustomergroup(data: Customergroup) {
    return this.http
      .put<Customergroup>(baseUrl + '/customergroup', data)
      .toPromise();
  }
  getCustomerid(id: Number) {
    return this.http.get(`${baseUrl + '/customer'}/${id}`).toPromise();
  }
  updateCustomer(data: Customer, id: Number) {
    return this.http
      .put<Customer>(`${baseUrl + '/customer'}/${id}`, data)
      .toPromise();
  }
  getCustomergroupid(id: number) {
    return this.http.get(`${baseUrl + '/customergroup'}/${id}`).toPromise();
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${baseUrl + '/customer'}/${id}`).toPromise();
  }
  deleteCustomergroup(id: number) {
    return this.http.delete(`${baseUrl + '/customergroup'}/${id}`).toPromise();
  }

  async getUnit(): Promise<Unit[]> {
    return await this.http.get<Unit[]>(baseUrl + '/unit').toPromise();
  }
}
