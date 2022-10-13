import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from '../models/userRegistration.model';
import { environment } from '../../environments/environment';
const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  async createUser(reportData: UserRegistration): Promise<UserRegistration> {
    return this.http
      .post<UserRegistration>(baseUrl + '/userregistration', reportData)
      .toPromise();
  }
}
