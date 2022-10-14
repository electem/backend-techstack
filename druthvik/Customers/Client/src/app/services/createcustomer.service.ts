import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { createCustomer } from '../models/customer.model';

const baseUrl = environment.url;

export class Status {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class customerService {
  private status: Status[] = [{ name: 'active' }, { name: 'inactive' }];
  constructor(private http: HttpClient) {}

  getStatus() {
    return this.status;
  }
  async createCustomer(
    createcustomer: createCustomer,
  ): Promise<createCustomer> {
    return await this.http
      .post<createCustomer>(baseUrl + '/createcustomer', createcustomer)
      .toPromise();
  }
}
