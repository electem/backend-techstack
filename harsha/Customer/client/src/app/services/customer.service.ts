import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  async createUser(user: User): Promise<User> {
    return await this.http.post<User>(baseUrl + 'createUser', user).toPromise();
  }
}
