import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RegisterUser } from '../models/userregister.model';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  constructor(private http: HttpClient) {}

  async registerUser(registerUser: RegisterUser): Promise<RegisterUser> {
    return await this.http
      .post<RegisterUser>(baseUrl + '/registeruser', registerUser)
      .toPromise();
  }
}
