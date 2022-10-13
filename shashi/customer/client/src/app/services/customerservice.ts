import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from '../models/userRegistration.model';
import { environment } from '../../environments/environment';
const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  async createUser(userData: UserRegistration): Promise<UserRegistration> {
    return this.http
      .post<UserRegistration>(baseUrl + '/userregistration', userData)
      .toPromise();
  }
}
