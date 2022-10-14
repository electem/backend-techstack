import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Register } from '../models/register';
import { Customer } from '../models/customer';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  createlogin(data: Register): Promise<Register> {
    return this.http.post<Register>(baseUrl + '/loginusers', data).toPromise();
  }

  async getAll(): Promise<Customer[]>{
    return await this.http.get<Customer[]>(baseUrl + './customer').toPromise();
  }
  createcustomer(data: Customer): Promise<Customer> {
    return this.http.post<Customer>(baseUrl + '/customer', data).toPromise();
  }
}
